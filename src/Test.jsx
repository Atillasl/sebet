import React from 'react'

// 1. Funksiyanı təyin et (Böyük hərflə başlamalıdır!)
function Salamlama() {
  
  // 2. Məntiq hissəsi (Burada JavaScript kodlarını yazırıq)
//   const ad = "Əqrəb Developer";

  // 3. Render hissəsi (Ekranda nə görsənəcək?)
//   return (
//     <div className="card">
//       <h1>Salam, {ad}!</h1>
//       <p>Bu sənin ilk Functional Component-indir.</p>
//     </div>
//   );
// }
const user = {
  name: "Əqrəb",
  isAdmin: true
};

return (
  <div className="container">
    <h1 id={user.name}> {user.name} </h1>
    {user.isAdmin && <button>Sistemi Sil</button>}
  <div>
    <button>Bas</button>
  </div>
  </div>

);}
console.log('salam');

export default Salamlama;