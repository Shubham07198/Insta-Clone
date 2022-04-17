import Feed from "../components/Feed"
import Head from 'next/head'
import Header from "../components/Header"
import Modal from "../components/Modal"

const Home =()=> {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Insta</title>

      </Head>
     
      <Header/>
      <Feed/>
     
      <Modal/>
    </div>
  )
}

export default Home
