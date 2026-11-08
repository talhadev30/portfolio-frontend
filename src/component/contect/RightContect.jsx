import { useEffect, useId, useRef, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Flags are images, not emoji, because emoji flags show as two letters on Windows.
const flagUrl = (iso2, width) =>
  `https://flagcdn.com/w${width}/${iso2.toLowerCase()}.png`;

const DEFAULT_COUNTRY = {
  id: "PK",
  iso2: "PK",
  name: "Pakistan",
  phonecode: "92",
};

const hideBrokenImage = (e) => {
  e.currentTarget.style.display = "none";
};

// Country code picker with flags and search
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
      ? "Loading countries..."
      : status === "error"
        ? "Could not load countries"
        : "No country found";

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
    if (e.key === "Enter" && e.target === searchRef.current) {
      e.preventDefault();
      if (visible.length > 0) choose(visible[0]);
      return;
    }
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
        className="flex items-center gap-2 pl-1 pr-2 py-3 text-white/70 outline-none text-sm"
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
          <span className="text-white/55">Code</span>
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
          className="absolute left-0 top-full mt-1 z-30 bg-neutral-900 border border-white/10 backdrop-blur-xl"
          style={{ width: "min(18rem, calc(100vw - 3rem))" }}
        >
          <div className="p-2 border-b border-white/10">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              aria-label="Search country"
              className="w-full bg-transparent border border-white/10 px-3 py-2 outline-none text-white text-sm placeholder:text-white/40 focus:border-white/50 transition-colors"
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
                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-white text-sm outline-none hover:bg-white/5 focus:bg-white/5 ${
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
                  <span className="text-xs text-white/55">+{c.phonecode}</span>
                </li>
              );
            })}
          </ul>

          {visible.length === 0 && (
            <p className="px-3 py-2 text-sm text-white/55">{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

const RightContect = () => {
  const [countries, setCountries] = useState([]);
  const [countriesStatus, setCountriesStatus] = useState("loading");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);

  const [usererr, setUsererr] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneerr, setPhoneerr] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setUsererr("");
    setEmailerr("");
    setPhoneerr("");

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

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim();
    if (!accessKey) {
      toast.error("The contact form is temporarily unavailable. Please reach out through GitHub or LinkedIn.");
      return;
    }

    setIsSubmitting(true);
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("phone", `+${selectedCountry.phonecode} ${phone.trim()}`);
    formData.set("country", selectedCountry.name || selectedCountry.iso2);
    formData.set("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Message sent successfully!");

        setUsername("");
        setEmail("");
        setMessage("");
        setPhone("");
        setSelectedCountry(DEFAULT_COUNTRY);

        form.reset();
      } else {
        toast.error(data.message || "Could not send your message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        const availableCountries = list
          .filter((c) => c.iso2 && c.phonecode)
          .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

        setCountries(availableCountries);
        setCountriesStatus(availableCountries.length > 0 ? "ready" : "error");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching countries:", error);
          setCountriesStatus("error");
        }
      }
    };

    fetchCountries();

    return () => controller.abort();
  }, []);

  /* shared input style */
  const inputClass =
    "w-full bg-transparent border-b border-white/20 pb-3 pt-6 outline-none text-white text-base placeholder:text-white/40 focus:border-white/70 transition-colors duration-300";

  return (
    <div className="w-full">
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

      {/* Section label */}
      <div className="mb-6 flex items-center gap-3 lg:mb-8">
        <div className="h-px flex-1 bg-white/10" />
        <span className="font-sans text-xs uppercase tracking-[0.25em] text-white/55">
          Send a message
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form
        onSubmit={onSubmit}
        aria-busy={isSubmitting}
        className="flex w-full flex-col gap-2 rounded-3xl border border-white/10 bg-white/[0.025] p-5 shadow-2xl shadow-black/30 sm:p-7 lg:p-8"
      >
        {/* Name + Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
          {/* NAME */}
          <div className="relative">
            <label
              htmlFor="contact-name"
              className="absolute top-0 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/55"
            >
              Name <span className="text-white/20">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={!!usererr}
              aria-describedby={usererr ? "name-error" : undefined}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your name"
              className={inputClass}
            />
            {usererr && (
              <p id="name-error" role="alert" className="text-xs text-red-400 mt-2">
                {usererr}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <label
              htmlFor="contact-email"
              className="absolute top-0 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/55"
            >
              Email <span className="text-white/20">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={!!emailerr}
              aria-describedby={emailerr ? "email-error" : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className={inputClass}
            />
            {emailerr && (
              <p id="email-error" role="alert" className="text-xs text-red-400 mt-2">
                {emailerr}
              </p>
            )}
          </div>
        </div>

        {/* PHONE */}
        <div className="relative">
          <label
            htmlFor="contact-phone"
            className="absolute top-0 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/55"
          >
            Phone <span className="text-white/20">*</span>
          </label>
          <div className="flex items-end border-b border-white/15 focus-within:border-white/60 transition-colors duration-300">
            <CountryPicker
              countries={countries}
              status={countriesStatus}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />

            <div className="w-px h-5 bg-white/10 mb-3 mx-1" />

            <input
              id="contact-phone"
              type="tel"
              name="phone"
              autoComplete="tel-national"
              inputMode="tel"
              required
              aria-label="Phone number"
              aria-required="true"
              aria-invalid={!!phoneerr}
              aria-describedby={phoneerr ? "phone-error" : undefined}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="123 456 7890"
              className="min-w-0 flex-1 bg-transparent pb-3 pt-6 outline-none text-white text-base placeholder:text-white/40"
            />
          </div>
          {phoneerr && (
            <p id="phone-error" role="alert" className="text-xs text-red-400 mt-2">
              {phoneerr}
            </p>
          )}
          {countriesStatus === "error" && !phoneerr && (
            <p role="status" className="mt-2 text-xs text-white/55">
              Country list unavailable. Pakistan (+92) is selected; you can still send your message.
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div className="relative">
          <label
            htmlFor="contact-message"
              className="absolute top-0 left-0 font-sans text-[10px] uppercase tracking-[0.2em] text-white/55"
          >
            Message <span className="text-white/20">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            name="message"
            required
            aria-required="true"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* SUBMIT */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative font-sans uppercase text-sm tracking-[0.2em] border border-white/20 rounded-full px-12 py-4 min-h-[48px] inline-flex items-center gap-3 hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500"
          >
            <span>{isSubmitting ? "Sending..." : "Send message"}</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightContect;
