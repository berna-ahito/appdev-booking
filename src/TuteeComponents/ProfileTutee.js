import React, { useState, useEffect } from 'react';
import HeaderTutee from './HeaderTutee';
import './CSS/ProfileTutee.css';

function ProfileStudent() {

  const studentId = localStorage.getItem("student_id");
  localStorage.setItem("student_id", studentId);

  console.log("Loaded student_id from localStorage:", studentId);


  const [isEditingUpper, setIsEditingUpper] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [studentDetails, setStudentDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birth_date: '',
    contact_number: '',
    address: '',
    city: '',
    province: '',
    home_address: '',
    permanent_address: '',
    gender: '',
    course: '',
    role: '',
    username: '',
    year_level: '',
    profileImage: '', // camelCase for backend
  });
  
  const [storedData, setStoredData] = useState({});

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:8080/student/getById/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched student data:", data); // <--- add this
            
          setStudentDetails({
            ...data,
            gender: data.gender || '',
            course: data.course || '',
            role: data.role || '',
            username: data.username || '',
            year_level: data.year_level || '',
            profileImage: data.profileImage || '',
          });
          setStoredData(data);
        })
        .catch((error) => console.error("Error fetching student data:", error));
    }
  }, [studentId]);

 

  
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (!currentPassword || !newPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/updatePassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          oldPassword: currentPassword,
          newPassword
        }),
      });

      if (response.ok) {
        alert("Password updated successfully.");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorText = await response.text();
        alert("Failed to update password: " + errorText);
      }
    } catch (error) {
      alert("Error updating password: " + error.message);
    }
  };

  const handleUpperSectionSave = async () => {
    const updatedUpperData = {
      ...(studentDetails.first_name !== storedData.first_name && { first_name: studentDetails.first_name }),
      ...(studentDetails.last_name !== storedData.last_name && { last_name: studentDetails.last_name }),
      ...(studentDetails.email !== storedData.email && { email: studentDetails.email }),
    };

    if (Object.keys(updatedUpperData).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUpperData),
      });

      if (response.ok) {
        alert("Profile updated successfully.");
        setIsEditingUpper(false);
      } else {
        const errorText = await response.text();
        alert("Failed to update profile: " + errorText);
      }
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handlePersonalInfo = async () => {
    const formattedBirthDate = studentDetails.birth_date
      ? new Date(studentDetails.birth_date).toISOString().split('T')[0]
      : '';

    const updatedData = {
      ...(studentDetails.birth_date !== storedData.birth_date && { birth_date: formattedBirthDate }),
      ...(studentDetails.contact_number !== storedData.contact_number && { contact_number: studentDetails.contact_number }),
      ...(studentDetails.address !== storedData.address && { address: studentDetails.address }),
    };

    if (Object.keys(updatedData).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Personal information updated successfully.");
        setIsEditingPersonal(false);
      } else {
        const errorText = await response.text();
        alert("Failed to update personal information: " + errorText);
      }
    } catch (error) {
      alert("Error updating personal information: " + error.message);
    }
  };

  return (
    <div>
      <HeaderTutee />
      <h1 className="settings-h1">Profile</h1>

      {/* Upper Section */}
      <div className="Upper-section">
  <img
    src={
      studentDetails.profileImage
        ? `http://localhost:8080/images/${studentDetails.profileImage}`
        : require('../images/FemaleProfile.png')
    }
    alt="Profile"
    className="profile-img"
  />

        <div>
          {isEditingUpper ? (
            <>
              <input
                type="text"
                value={studentDetails.first_name}
                onChange={(e) => setStudentDetails({ ...studentDetails, first_name: e.target.value })}
              />
              <input
                type="text"
                value={studentDetails.last_name}
                onChange={(e) => setStudentDetails({ ...studentDetails, last_name: e.target.value })}
              />
              <input
                type="email"
                value={studentDetails.email}
                onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
              />
            </>
          ) : (
            <>
              <p className="Name">{`${studentDetails.first_name} ${studentDetails.last_name}`}</p>
              <p className="Email">{studentDetails.email}</p>
              
            </>
          )}
        </div>

        <button
          className="edit-button"
          onClick={() => {
            if (isEditingUpper) handleUpperSectionSave();
            setIsEditingUpper(!isEditingUpper);
          }}
        >
          {isEditingUpper ? "Save" : "Edit"}
        </button>
      </div>


      {/* Personal Info */}
      <div className="middle-section">
        <div className="section-header">
          <h3>Personal Information</h3>
          <button className="edit-button" onClick={isEditingPersonal ? handlePersonalInfo : () => setIsEditingPersonal(!isEditingPersonal)}>
            {isEditingPersonal ? "Save" : "Edit"}
          </button>
        </div>

        <div className="info-grid">
          <div className="info-pair">
            <p className="label">Date of Birth</p>
            {isEditingPersonal ? (
              <input type="date" value={studentDetails.birth_date} onChange={(e) => setStudentDetails({ ...studentDetails, birth_date: e.target.value })} />
            ) : (
              <p className="value">{studentDetails.birth_date}</p>
            )}
          </div>

          <div className="info-pair">
            <p className="label">Address</p>
            {isEditingPersonal ? (
              <input type="text" value={studentDetails.address} onChange={(e) => setStudentDetails({ ...studentDetails, address: e.target.value })} />
            ) : (
              <p className="value">{studentDetails.address}</p>
            )}
          </div>

          <div className="info-pair">
            <p className="label">Phone</p>
            {isEditingPersonal ? (
              <input type="text" value={studentDetails.contact_number} onChange={(e) => setStudentDetails({ ...studentDetails, contact_number: e.target.value })} />
            ) : (
              <p className="value">{studentDetails.contact_number}</p>
            )}
          </div>
        </div>
      </div>

      {/* Password Update */}
      <div className="lower-section">
        <div className="section-header">
          <h3>Privacy & Security</h3>
          <button className="edit-button" onClick={() => {
            if (isEditingPassword) handlePasswordUpdate();
            setIsEditingPassword(!isEditingPassword);
          }}>
            {isEditingPassword ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="privacy-grid">
          <div className="password-section">
            <h4 className="changePass">Change Password</h4>
            <p className="lblCurrent">Current Password</p>
            <input
              type="password"
              className="txtCurrent"
              placeholder="Enter Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className="lblNew">New Password</p>
            <input
              type="password"
              className="txtNew"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className="lblConfirm">Confirm Password</p>
            <input
              type="password"
              className="txtConfirm"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStudent;


// import React, { useState, useEffect } from 'react';
// import HeaderTutee from './HeaderTutee';
// import './CSS/ProfileTutee.css';

// function ProfileStudent() {
//   const studentId = localStorage.getItem("student_id");
//   // Example of setting student_id in localStorage
// localStorage.setItem("student_id", studentId); // Use the actual studentId value

//   console.log("Loaded student_id from localStorage:", studentId);

//   const [isEditingUpper, setIsEditingUpper] = useState(false);
//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [isEditingPassword, setIsEditingPassword] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [studentDetails, setStudentDetails] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     birth_date: '',
//     contact_number: '',
//     address: '',
//     city: '',
//     province: '',
//     home_address: '',
//     permanent_address: '',
//     gender: '',
//     course: '',
//     role: '',
//     username: '',
//     year_level: '',
//     profileImage: '', // camelCase for backend
//   });

//   const [storedData, setStoredData] = useState({});
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track error state

//   // useEffect(() => {
//   //   if (studentId) {
//   //     fetch(`http://localhost:8080/student/getById/${studentId}`)
//   //       .then((res) => {
//   //         if (!res.ok) {
//   //           throw new Error('Failed to fetch student data');
//   //         }
//   //         return res.json();
//   //       })
//   //       .then((data) => {
//   //         console.log("Fetched student data:", data); // Add this for debugging
//   //         setStudentDetails({
//   //           ...data,
//   //           gender: data.gender || '',
//   //           course: data.course || '',
//   //           role: data.role || '',
//   //           username: data.username || '',
//   //           year_level: data.year_level || '',
//   //           profileImage: data.profileImage || '',
//   //         });
//   //         setStoredData(data);
//   //         setLoading(false); // Set loading to false after data is fetched
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching student data:", error);
//   //         setError(error.message);
//   //         setLoading(false); // Set loading to false if there's an error
//   //       });
//   //   } else {
//   //     setError('No student_id found in localStorage');
//   //     setLoading(false); // Set loading to false if there's no student_id
//   //   }
//   // }, [studentId]);

//   useEffect(() => {
//     const studentId = localStorage.getItem("student_id");
//     if (studentId) {
//       setLoading(true);  // Set loading to true when fetch starts
//       fetch(`http://localhost:8080/student/getById/${studentId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setStudentDetails({
//             ...data,
//             gender: data.gender || '',
//             course: data.course || '',
//             role: data.role || '',
//             username: data.username || '',
//             year_level: data.year_level || '',
//             profileImage: data.profileImage || '',
//           });
//           setStoredData(data);
//         })
//         .catch((error) => {
//           console.error("Error fetching student data:", error);
//           setError("Failed to load data.");  // Set an error message if fetch fails
//         })
//         .finally(() => setLoading(false));  // Set loading to false once fetch completes
//     } else {
//       console.error("No student_id found in localStorage.");
//     }
//   }, []);
  

  
//   const handlePasswordUpdate = async () => {
//     if (newPassword !== confirmPassword) {
//       alert("New passwords do not match.");
//       return;
//     }

//     if (!currentPassword || !newPassword) {
//       alert("Please fill in all password fields.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/student/updatePassword`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           studentId,
//           oldPassword: currentPassword,
//           newPassword
//         }),
//       });

//       if (response.ok) {
//         alert("Password updated successfully.");
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//       } else {
//         const errorText = await response.text();
//         alert("Failed to update password: " + errorText);
//       }
//     } catch (error) {
//       alert("Error updating password: " + error.message);
//     }
//   };

//   const handleUpperSectionSave = async () => {
//     const updatedUpperData = {
//       ...(studentDetails.first_name !== storedData.first_name && { first_name: studentDetails.first_name }),
//       ...(studentDetails.last_name !== storedData.last_name && { last_name: studentDetails.last_name }),
//       ...(studentDetails.email !== storedData.email && { email: studentDetails.email }),
//     };

//     if (Object.keys(updatedUpperData).length === 0) {
//       alert("No changes made.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedUpperData),
//       });

//       if (response.ok) {
//         alert("Profile updated successfully.");
//         setIsEditingUpper(false);
//       } else {
//         const errorText = await response.text();
//         alert("Failed to update profile: " + errorText);
//       }
//     } catch (error) {
//       alert("Error updating profile: " + error.message);
//     }
//   };

//   const handlePersonalInfo = async () => {
//     const formattedBirthDate = studentDetails.birth_date
//       ? new Date(studentDetails.birth_date).toISOString().split('T')[0]
//       : '';

//     const updatedData = {
//       ...(studentDetails.birth_date !== storedData.birth_date && { birth_date: formattedBirthDate }),
//       ...(studentDetails.contact_number !== storedData.contact_number && { contact_number: studentDetails.contact_number }),
//       ...(studentDetails.address !== storedData.address && { address: studentDetails.address }),
//     };

//     if (Object.keys(updatedData).length === 0) {
//       alert("No changes made.");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedData),
//       });

//       if (response.ok) {
//         alert("Personal information updated successfully.");
//         setIsEditingPersonal(false);
//       } else {
//         const errorText = await response.text();
//         alert("Failed to update personal information: " + errorText);
//       }
//     } catch (error) {
//       alert("Error updating personal information: " + error.message);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <HeaderTutee />
//       <h1 className="settings-h1">Profile</h1>

//       {/* Upper Section */}
//       <div className="Upper-section">
//         <img
//           src={
//             studentDetails.profileImage
//               ? `http://localhost:8080/images/${studentDetails.profileImage}`
//               : require('../images/FemaleProfile.png')
//           }
//           alt="Profile"
//           className="profile-img"
//         />

//         <div>
//           {isEditingUpper ? (
//             <>
//               <input
//                 type="text"
//                 value={studentDetails.first_name}
//                 onChange={(e) => setStudentDetails({ ...studentDetails, first_name: e.target.value })}
//               />
//               <input
//                 type="text"
//                 value={studentDetails.last_name}
//                 onChange={(e) => setStudentDetails({ ...studentDetails, last_name: e.target.value })}
//               />
//               <input
//                 type="email"
//                 value={studentDetails.email}
//                 onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
//               />
//             </>
//           ) : (
//             <>
//               <p className="Name">{`${studentDetails.first_name} ${studentDetails.last_name}`}</p>
//               <p className="Email">{studentDetails.email}</p>
//             </>
//           )}
//         </div>

//         <button
//           className="edit-button"
//           onClick={() => {
//             if (isEditingUpper) handleUpperSectionSave();
//             setIsEditingUpper(!isEditingUpper);
//           }}
//         >
//           {isEditingUpper ? "Save" : "Edit"}
//         </button>
//       </div>

//       {/* Personal Info */}
//       <div className="middle-section">
//         <div className="section-header">
//           <h3>Personal Information</h3>
//           <button className="edit-button" onClick={isEditingPersonal ? handlePersonalInfo : () => setIsEditingPersonal(!isEditingPersonal)}>
//             {isEditingPersonal ? "Save" : "Edit"}
//           </button>
//         </div>

//         <div className="info-grid">
//           <div className="info-pair">
//             <p className="label">Date of Birth</p>
//             {isEditingPersonal ? (
//               <input type="date" value={studentDetails.birth_date} onChange={(e) => setStudentDetails({ ...studentDetails, birth_date: e.target.value })} />
//             ) : (
//               <p className="value">{studentDetails.birth_date}</p>
//             )}
//           </div>

//           <div className="info-pair">
//             <p className="label">Address</p>
//             {isEditingPersonal ? (
//               <input type="text" value={studentDetails.address} onChange={(e) => setStudentDetails({ ...studentDetails, address: e.target.value })} />
//             ) : (
//               <p className="value">{studentDetails.address}</p>
//             )}
//           </div>

//           <div className="info-pair">
//             <p className="label">Phone</p>
//             {isEditingPersonal ? (
//               <input type="text" value={studentDetails.contact_number} onChange={(e) => setStudentDetails({ ...studentDetails, contact_number: e.target.value })} />
//             ) : (
//               <p className="value">{studentDetails.contact_number}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Password Update */}
//       <div className="lower-section">
//         <div className="section-header">
//           <h3>Privacy & Security</h3>
//           <button className="edit-button" onClick={() => {
//             if (isEditingPassword) handlePasswordUpdate();
//             setIsEditingPassword(!isEditingPassword);
//           }}>
//             {isEditingPassword ? 'Save' : 'Edit'}
//           </button>
//         </div>

//         <div className="privacy-grid">
//           <div className="password-section">
//             <h4 className="changePass">Change Password</h4>
//             <p className="lblCurrent">Current Password</p>
//             <input
//               type="password"
//               className="txtCurrent"
//               placeholder="Enter Current Password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               disabled={!isEditingPassword}
//             />
//             <p className="lblNew">New Password</p>
//             <input
//               type="password"
//               className="txtNew"
//               placeholder="Enter New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               disabled={!isEditingPassword}
//             />
//             <p className="lblConfirm">Confirm Password</p>
//             <input
//               type="password"
//               className="txtConfirm"
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               disabled={!isEditingPassword}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileStudent;
