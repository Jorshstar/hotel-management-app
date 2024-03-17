import Link from "next/link"
import { BiMessageDetail } from "react-icons/bi"
import { BsFillSendFill, BsTelephoneOutbound } from "react-icons/bs"

const Footer = () => {
  return (
    <footer className="mt-=16">
      <div className="container mx-auto px-4">
        <Link href='/' className="font-black text-tertiary-dark">HotelHub
        </Link>

        <h4 className="font-semibold text-[40px] py-6 text-tertiary-light">Get In Touch</h4>

        <div className="flex flex-wrap gap-16 items-center justify-between">
          <div className="flex-1">
            <p>1234 Elm Street, City, State 12345</p>
            <div className="flex items-center py-4">
              <BsFillSendFill/>
              <p className="ml-2">1234@gmail.com</p>
            </div>
            <div className="flex items-center">
              <BsTelephoneOutbound/>
              <p className="ml-2">000-000-000</p>
            </div>
            <div className="flex items-center pt-4">
              <BiMessageDetail/>
              <p className="ml-2">Josh Tech</p>
            </div>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4">Home</p>
            <p className="pb-4">About</p>
            <p className="pb-4">Rooms</p>
            
            <p className="pb-4">Contact</p>
          </div>

          <div className="flex-1 md:text-right">
            <p className="pb-4">Our Story</p>
            <p className="pb-4">Customer Assistance</p>
          </div>
          <div className="flex-1 md:text-right">
            <p className="pb-4">Dining Experience</p>
            <p className="pb-4">Wellness</p>
            <p className="pb-4">Fitness</p>
            <p className="pb-4">Sports</p>
            <p>Events</p>
          </div>
        </div>
      </div>

      <div className="bg-tertiary-light h-10 md:h-[70px] mt-16 w-full bottom-0 left-0 flex items-center">
      <Link href='/' className="font-black text-white ml-6">HotelHub
        </Link>
        <div className="ml-auto mr-6 text-white">Terms of services | Privacy</div>
      </div>
    </footer>
  )
}

export default Footer
