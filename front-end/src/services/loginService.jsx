// export async function fecthLoginUser(formData){
//     const response = await fetch("http://localhost:8080/api/researcher/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", },
//         body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message);
//     }

//     return response.json();
// }