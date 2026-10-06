import { useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RightContect = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [usererr, setUsererr] = useState("");
  const [emailerr, setEmailerr] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setUsererr("");
    setEmailerr("");

    // Validation
    if (username.trim() === "") {
      setUsererr("Name is required");
      return;
    }

    if (email.trim() === "") {
      setEmailerr("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setEmailerr("Enter a valid Email");
      return;
    }

    const formData = new FormData(event.target);

    // Web3Forms Access Key
    formData.append("access_key",
      import.meta.env.VITE_WEB3FORMS_KEY
    );

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Form Submitted Successfully!");

        setUsername("");
        setEmail("");
        setMessage("");

        event.target.reset();
      } else {
        toast.error(data.message || "Error submitting form");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full pt-6">

      <ToastContainer
        position="bottom-right"
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

      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-8"
      >

        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAME */}
          <div className="flex flex-col gap-2">

            <label className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John DOE"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666]"
            />

            <p className="text-sm text-red-600">
              {usererr}
            </p>

          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">

            <label className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666]"
            />

            <p className="text-sm text-red-600">
              {emailerr}
            </p>

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
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="bg-transparent border border-[#6b6b6b] px-4 py-4 outline-none resize-none text-white placeholder:text-[#666]"
          />

        </div>

        {/* BUTTON */}
        <div>

          <button
            type="submit"
            className="uppercase border border-[#8b8b8b] rounded-full px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            Send
          </button>

        </div>

      </form>

    </div>
  );
};

export default RightContect;