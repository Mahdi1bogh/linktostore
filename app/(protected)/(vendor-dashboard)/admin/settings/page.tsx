// 'use client';
// import { createClient } from '@/utils/supabase/client';
// import { useState, useEffect } from 'react';

// const Settings = () => {
//   const supabase = createClient();
//   const [storeInfo, setStoreInfo] = useState({
//     name: '',
//     description: '',
//     logoUrl: '',
//   });

//   useEffect(() => {
//     const fetchStoreInfo = async () => {
//       const { data, error } = await supabase
//         .from('stores')
//         .select('*')
//         .single();

//       if (error) {
//         console.error('Error fetching store info:', error);
//         return;
//       }

//       setStoreInfo(data);
//     };

//     fetchStoreInfo();
//   }, []);

//   const handleInputChange = (event) => {
//     setStoreInfo({ ...storeInfo, [event.target.name]: event.target.value });
//   };

//   const handleLogoUpload = async (event) => {
//     const file = event.target.files[0];

//     if (!file) return;

//     const { error: uploadError } = await supabase.storage
//       .from('store-logos')
//       .upload(file.name, file);

//     if (uploadError) {
//       console.error('Error uploading logo:', uploadError);
//       return;
//     }

//     const { publicUrl } = await supabase.storage
//       .from('store-logos')
//       .getPublicUrl(file.name);

//     setStoreInfo({ ...storeInfo, logoUrl: publicUrl });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error } = await supabase
//       .from('store')
//       .update({ ...storeInfo })
//       .match({ id: 1 }); // Replace 1 with your store ID retrieval logic

//     if (error) {
//       console.error('Error updating store info:', error);
//       return;
//     }

//     // Handle successful update (optional: show success message)
//   };

//   return (
//     <div className="settings-container bg-gray-100 p-4 rounded shadow-md">
//       <h2>Store Info Settings</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="form-group">
//           <label
//             htmlFor="storeName"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Store Name:
//           </label>
//           <input
//             type="text"
//             id="storeName"
//             name="name"
//             value={storeInfo.name}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="form-group">
//           <label
//             htmlFor="storeDescription"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Store Description:
//           </label>
//           <textarea
//             id="storeDescription"
//             name="description"
//             value={storeInfo.description}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="form-group">
//           <label
//             htmlFor="storeLogo"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Store Logo:
//           </label>
//           <input
//             type="file"
//             id="storeLogo"
//             name="logo"
//             onChange={handleLogoUpload}
//             className="custom-file-input"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Save Changes
//         </button>
//       </form>
//       <div className="logo-preview mt-4">
//         <h4>Current Logo</h4>
//         {storeInfo.logoUrl && <img src={storeInfo.logoUrl} alt="Store Logo" />}
//       </div>
//     </div>
//   );
// };

// export default Settings;
import React from 'react';

const page = () => {
  return <div>Settings page</div>;
};

export default page;
