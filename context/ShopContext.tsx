'use client';
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  description: string;
  parent_id: number;
  store: any;
}

interface AuthState {
  userData: any | null;
  store: any | null;
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  userData: null,
  store: null,
  categories: [],
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      return { ...state, ...action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthState>(initialState);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const supabase = createClient();
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();
  const fetchStoreAndCategories = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true }); // Set loading state

    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        throw userError;
      }

      if (!user?.user) {
        router.push('login');
      }
      if (user && user?.user?.id) {
        const updatedState: Partial<AuthState> = {
          userData: user.user,
        };

        // Fetch store ID
        let { data: storeData, error } = await supabase
          .from('store')
          .select('*')
          .eq('owner_id', user.user.id)
          .single();
        if (error) {
          throw error;
        }

        updatedState.store = storeData;

        if (storeData && storeData.id) {
          // Fetch categories
          const { data: categoryData, error: categoryError } = await supabase
            .from('category')
            .select('*')
            .eq('store_id', storeData.id);
          if (categoryError) {
            throw categoryError;
          }

          updatedState.categories = categoryData || [];
        }

        dispatch({ type: 'SET_AUTH_STATE', payload: updatedState });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false }); // Set loading state to false
    }
  }, []);

  useEffect(() => {
    fetchStoreAndCategories();
  }, []);

  const logout = async () => {
    const supabase = createClient();
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error('Logout error:', logoutError);
    }
    dispatch({
      type: 'SET_AUTH_STATE',
      payload: { userData: null, store: null, categories: [] },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        fetchStoreAndCategories,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
