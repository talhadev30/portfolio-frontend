import { useEffect, useId, useRef, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Flags are images, not emoji, because emoji flags show as two letters on Windows.
const flagUrl = (iso2, width) =>
  `https://flagcdn.com/w${width}/${iso2.toLowerCase()}.png`;

const hideBrokenImage = (e) => {
  e.currentTarget.style.display = "none";
};

// Country code picker with flags and search, styled to match the phone field.
const CountryPicker = ({ countries, status, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const panelRef = useRef(null);
  const listId = useId();

  const term = query.trim().toLowerCase().replace(/^\+/, "");
  const visible = term
    ? countries.filter(
        (c) =>
          c.name?.toLowerCase().includes(term) ||
          c.iso2?.toLowerCase().includes(term) ||
          String(c.phonecode).includes(term),
      )
    : countries;

  const emptyMessage =
    status === "loading"
      ? "Loading countries…"
      : status === "error"
        ? "Could not load countries"
        : "No country found";

  // Close when the user clicks or taps outside the picker.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Focus the search box when the list opens.
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    triggerRef.current?.focus();
  };

  const choose = (country) => {
    onSelect(country);
    close();
  };

  const handlePanelKeys = (e) => {
    // Enter in the search box picks the first match. It must not submit the form.
    if (e.key === "Enter" && e.target === searchRef.current) {
      e.preventDefault();
      if (visible.length > 0) choose(visible[0]);
      return;
    }

    // Arrow keys move between the search box and the options.
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const items = Array.from(
        panelRef.current?.querySelectorAll("[role='option']") ?? [],
      );
      const index = items.indexOf(document.activeElement);
      const next =
        e.key === "ArrowDown"
          ? Math.min(index + 1, items.length - 1)
          : Math.max(index - 1, 0);
      items[next]?.focus();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative shrink-0"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) close();
      }}
      onBlur={(e) => {
        // Close when keyboard focus leaves the picker.
        if (open && !wrapperRef.current?.contains(e.relatedTarget)) {
          setOpen(false);
          setQuery("");
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={
          selected
            ? `Country code: ${selected.name} +${selected.phonecode}`
            : "Select country code"
        }
        onClick={() => (open ? close() : setOpen(true))}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="flex items-center gap-2 pl-3 pr-2 py-3 text-white outline-none"
      >
        {selected ? (
          <>
            <img
              src={flagUrl(selected.iso2, 40)}
              srcSet={`${flagUrl(selected.iso2, 80)} 2x`}
              alt=""
              width={20}
              height={15}
              onError={hideBrokenImage}
              className="w-5 h-auto rounded-sm"
            />
            <span>+{selected.phonecode}</span>
          </>
        ) : (
          <span>Select Country</span>
        )}

        <svg
          aria-hidden="true"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          onKeyDown={handlePanelKeys}
          className="absolute left-0 top-full mt-2 z-30 bg-[#222] border border-[#6b6b6b] outline-none"
          style={{ width: "min(18rem, calc(100vw - 3rem))" }}
        >
          <div className="p-2 border-b border-[#6b6b6b]">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              aria-label="Search country"
              className="w-full bg-transparent border border-[#6b6b6b] px-3 py-2 outline-none text-white placeholder:text-[#666] focus:border-white transition-colors"
            />
          </div>

          <ul
            id={listId}
            role="listbox"
            aria-label="Countries"
            className="max-h-64 overflow-y-auto py-1"
          >
            {visible.map((c) => {
              const isSelected = selected?.iso2 === c.iso2;
              return (
                <li
                  key={c.id ?? c.iso2}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onClick={() => choose(c)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      choose(c);
                    }
                  }}
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-white outline-none hover:bg-white/10 focus:bg-white/10 ${
                    isSelected ? "bg-white/5" : ""
                  }`}
                >
                  <img
                    src={flagUrl(c.iso2, 40)}
                    srcSet={`${flagUrl(c.iso2, 80)} 2x`}
                    alt=""
                    width={20}
                    height={15}
                    loading="lazy"
                    onError={hideBrokenImage}
                    className="w-5 h-auto rounded-sm shrink-0"
                  />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-sm text-[#aaa]">+{c.phonecode}</span>
                </li>
              );
            })}
          </ul>

          {visible.length === 0 && (
            <p className="px-3 py-2 text-sm text-[#999]">{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

const RightContect = () => {
  // all countries state
  const [countries, setCountries] = useState([]);
  const [countriesStatus, setCountriesStatus] = useState("loading");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [usererr, setUsererr] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneerr, setPhoneerr] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setUsererr("");
    setEmailerr("");
    setPhoneerr("");

    // Validation
    if (username.trim() === "") {
      setUsererr("Name is required");
      return;
    }

    if (email.trim() === "") {
      setEmailerr("Email is required");
      return;
    }

    if (phone.trim() === "") {
      setPhoneerr("Phone is required");
      return;
    }

    if (!selectedCountry) {
      setPhoneerr("Select a country code");
      return;
    }

    if (!email.includes("@")) {
      setEmailerr("Enter a valid Email");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(event.target);

    // Send the full international number, for example "+1 2025550123"
    formData.set("phone", `+${selectedCountry.phonecode} ${phone.trim()}`);
    formData.set("country", selectedCountry.name || selectedCountry.iso2);

    // Web3Forms Access Key
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Form Submitted Successfully!");

        setUsername("");
        setEmail("");
        setMessage("");
        setPhone("");
        setSelectedCountry(null);

        event.target.reset();
      } else {
        toast.error(data.message || "Error submitting form");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch countries from API
  useEffect(() => {
    const controller = new AbortController();

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://csc.sidsworld.co.in/api/countries",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.countries)
              ? data.countries
              : [];

        setCountries(
          list
            .filter((c) => c.iso2 && c.phonecode)
            .sort((a, b) => (a.name || "").localeCompare(b.name || "")),
        );
        setCountriesStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching countries:", error);
          setCountriesStatus("error");
          toast.error("Could not load countries. Please try again.");
        }
      }
    };

    fetchCountries();

    return () => controller.abort();
  }, []);

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

      {/* form */}
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold"
            >
              Full Name{" "}
              <span className="text-emerald-400" aria-hidden="true">
                *
              </span>
            </label>

            <input
              id="contact-name"
              type="text"
              name="name"
              required
              aria-required="true"
              aria-invalid={!!usererr}
              aria-describedby={usererr ? "name-error" : undefined}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John DOE"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666] focus:border-white transition-colors"
            />

            {usererr && (
              <p
                id="name-error"
                role="alert"
                className="text-sm text-red-500 font-medium"
              >
                {usererr}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold"
            >
              Email{" "}
              <span className="text-emerald-400" aria-hidden="true">
                *
              </span>
            </label>

            <input
              id="contact-email"
              type="email"
              name="email"
              required
              aria-required="true"
              aria-invalid={!!emailerr}
              aria-describedby={emailerr ? "email-error" : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="bg-transparent border border-[#6b6b6b] px-4 py-3 outline-none text-white placeholder:text-[#666] focus:border-white transition-colors"
            />

            {emailerr && (
              <p
                id="email-error"
                role="alert"
                className="text-sm text-red-500 font-medium"
              >
                {emailerr}
              </p>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-phone"
            className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold"
          >
            Phone{" "}
            <span className="text-emerald-400" aria-hidden="true">
              *
            </span>
          </label>
          <div className="flex items-center border border-[#6b6b6b] focus-within:border-white transition-colors">
            <CountryPicker
              countries={countries}
              status={countriesStatus}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />

            <div className="w-px h-7 bg-[#6b6b6b]" />

            <input
              id="contact-phone"
              type="tel"
              name="phone"
              required
              aria-label="Phone number"
              aria-required="true"
              aria-invalid={!!phoneerr}
              aria-describedby={phoneerr ? "phone-error" : undefined}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123-456-7890"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none text-white placeholder:text-[#666]"
            />
          </div>

          {phoneerr && (
            <p
              id="phone-error"
              role="alert"
              className="text-sm text-red-500 font-medium"
            >
              {phoneerr}
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contact-message"
            className="uppercase text-sm tracking-wide text-[#d9d9d9] font-semibold"
          >
            Message{" "}
            <span className="text-emerald-400" aria-hidden="true">
              *
            </span>
          </label>

          <textarea
            id="contact-message"
            rows={7}
            name="message"
            required
            aria-required="true"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="bg-transparent border border-[#6b6b6b] px-4 py-4 outline-none resize-none text-white placeholder:text-[#666] focus:border-white transition-colors"
          />
        </div>

        {/* BUTTON */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="uppercase border border-[#8b8b8b] rounded-full px-8 py-3 min-h-[48px] inline-flex items-center justify-center text-sm tracking-wide hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightContect;
