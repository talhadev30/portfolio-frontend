import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightContect = () => {

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [usererr, setusererr] = useState("")
  const [emailerr, setemailerr] = useState("")
  const [haserr, setHaserr] = useState(false)

  async function HandlSubmit(e) {

    setusererr("");
    setemailerr("");

    if (username === "") {
    setusererr("Name is required")
    setHaserr(true)
    } 
    
    if (email === "") {
      setemailerr("Email is required")
    setHaserr(true)

    }else if (!email.includes('@')) {
    setemailerr("Enter a valid Email")
    setHaserr(true)
    }

    if (haserr) return;


    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_SECRET,
        {
          username,
          email,
          message,
        }
      );

      toast.success(res.data.message);

      setusername("");
      setEmail("");
      setmessage("");
    } catch {
      toast.error("Failed to send message");
    }
  }




  return (
    <div className="w-full pt-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <form onSubmit={HandlSubmit} className="w-full flex flex-col gap-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="flex flex-col gap-2">
            <label className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              placeholder="John DOE"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666]"
            />
            <p className="text-sm text-red-600">{usererr}</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@gmail.com"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666]"
            />
            <p className="text-sm text-red-600">{emailerr}</p>
          </div>

        </div>

        {/* MESSAGE */}
        <div className="flex flex-col gap-2">
          <label className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold">
            Message
          </label>

          <textarea
            rows={7}
            name="message"
            value={message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            placeholder="Write your message here..."
            className="bg-transparent border border-[#6b6b6b] px-4 py-4 outline-none resize-none text-white placeholder:text-[#666]"
          />
        </div>
        <div>
          <button
            type="submit"
            className="uppercase border border-[#8b8b8b] rounded-full px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300">
            Send
          </button>
        </div>

      </form>
    </div>
  );
};

export default RightContect;