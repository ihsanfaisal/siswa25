import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// ini adalah konfigurasi firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarSiswa() {
  const refDokumen = collection(basisdata, "siswa");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat
    })
  })

  return hasilKueri;
}

export async function tambahSiswa(nama, alamat) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "siswa"), {
      nama: nama,
      alamat: alamat
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data siswa")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data siswa")
  }
}

export async function hapusSiswa(id) {
  await deleteDoc(doc(basisdata, "siswa", id))
}

export async function ambilSiswa(id) {
  const refDokumen = await doc(basisdata, "siswa", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}

export async function ubahSiswa(id, namabaru, alamatbaru) {
  await updateDoc(doc(basisdata, "siswa", id), { nama: namabaru, alamat: alamatbaru })
}