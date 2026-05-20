import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Rocket, ChevronRight } from "lucide-react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";

// Custom sub-component for the text reveal animation without breaking layout flows
const LeftToRightText = ({ text, className, delay = 0, style }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.04,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 14, stiffness: 100 },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={style}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {Array.from(word).map((letter, letterIdx) => (
            <motion.span
              key={letterIdx}
              variants={childVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

const CourseCard = ({ course, isEnrolled, onAddToCart, onBuy }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const syncWishlistState = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setIsWishlisted(wishlist.includes(course._id));
    };

    syncWishlistState();
    window.addEventListener("wishlistUpdate", syncWishlistState);

    return () => window.removeEventListener("wishlistUpdate", syncWishlistState);
  }, [course._id]);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(course._id)) {
      wishlist = wishlist.filter((id) => id !== course._id);
    } else {
      wishlist.push(course._id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(wishlist.includes(course._id));
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      className="group cursor-pointer bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-20 bg-white/90 p-2 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          {isWishlisted ? (
            <FaHeart className="text-[#00A851] text-sm" />
          ) : (
            <FaRegHeart className="text-gray-500 text-sm hover:text-[#00A851]" />
          )}
        </button>

        {course.image ? (
          <img
            src={`${import.meta.env.VITE_UPLOADS_IMAGES_URL}/${course.image}`}
            alt={course.title}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 font-medium">
            No Preview Available
          </div>
        )}

        {course.price === 0 && (
          <span className="absolute top-3 left-3 bg-[#FF6A3D] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Free
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <h3 className="font-bold text-[#1A2238] text-md leading-snug line-clamp-2 mb-2 group-hover:text-[#00A851] transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4 italic">
          By {course.teacher?.name || "Expert Instructor"}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-2xl font-black text-[#1A2238]">
            ₹{course.price || 0}
          </span>

          {isEnrolled ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course._id}`);
              }}
              className="bg-green-50 text-[#00A851] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#00A851] hover:text-white transition-all"
            >
              Go to Course
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(course._id);
                }}
                className="bg-gray-100 text-[#1A2238] px-3 py-2 rounded-xl text-sm font-bold hover:bg-green-50 hover:text-[#00A851] transition-all flex items-center gap-1"
              >
                <FaShoppingCart size={12} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBuy(course._id);
                }}
                className="bg-[#1A2238] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#00A851] shadow-md transition-all"
              >
                Enroll
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [featublueCourses, setFeatublueCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const fetchEnrolledCourses = async () => {
    try {
      const res = await API.get("/enrollments/my-courses");
      setEnrolledCourses((res.data || []).map((item) => item.course._id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await API.get("/courses/trending");
      setTrendingCourses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFeatublue = async () => {
    try {
      const res = await API.get("/courses/featublue");
      setFeatublueCourses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
    fetchTrending();
    fetchFeatublue();
  }, []);

  const handleBuy = async (courseId) => {
    try {
      localStorage.setItem("courseId", courseId);
      const res = await API.post("/payment/checkout", { courseId });
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handleAddToCart = (courseId) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(courseId)) {
      cart.push(courseId);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdate"));
    }
  };

  return (
    <div className="bg-[#fcfdfc] min-h-screen font-sans antialiased text-gray-800">
      
      {/* Hero Container matched to reference design background accents */}
      <div className="relative bg-gradient-to-br from-white via-[#f4fbf6] to-[#edfcf1] pt-20 pb-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#00A851] rounded-full blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#00A851] rounded-full blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 text-center lg:text-left">
            
            {/* Structured responsive typography setup to enforce clean alignment limits */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-normal text-[#1A2238] tracking-tight leading-[1.15] mb-6 flex flex-wrap justify-center lg:justify-start">
              <LeftToRightText text="Unlock Your" className="mr-[0.3em] block w-full lg:w-auto" />
              <LeftToRightText 
                text="Future Potential" 
                className="font-semibold text-[#00A851]" 
                delay={0.45} 
              />
            </h1>

            {/* Clean subtext block matches tracking specs */}
            <p className="text-base sm:text-lg text-gray-600 font-normal mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-normal">
              Join over 5,000+ students mastering real-world skills with expert-led courses.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: 720,
                    behavior: "smooth",
                  })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00A851] font-bold text-md text-white shadow-md hover:bg-[#008f43] transition-all duration-200 cursor-pointer group"
              >
                <span>Start Learning</span>
                <Rocket size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Interactive Learning Graphic Frame Panel */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none relative group flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-[#00A851] rounded-[2rem] opacity-10 blur-xl group-hover:scale-105 transition-transform duration-500"></div>
            <img
              src={heroImage}
              alt="Interactive Learning"
              className="relative z-10 w-full lg:w-[92%] rounded-[2rem] shadow-xl border-4 border-white object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Main Core Feed Dashboard */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-24">
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A2238]">
                Trending Right Now
              </h2>
             
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-0.5 text-[#00A851] text-sm font-bold hover:underline"
            >
              View All
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingCourses.length > 0 ? (
              trendingCourses.map((c) => (
                <CourseCard
                  key={c._id}
                  course={c}
                  isEnrolled={enrolledCourses.includes(c._id)}
                  onAddToCart={handleAddToCart}
                  onBuy={handleBuy}
                />
              ))
            ) : (
              <div className="col-span-full h-40 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 text-sm">
                Fetching trending courses...
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 bg-[#00A851] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#1A2238]">
              Feature Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featublueCourses.length > 0 ? (
              featublueCourses.map((c) => (
                <CourseCard
                  key={c._id}
                  course={c}
                  isEnrolled={enrolledCourses.includes(c._id)}
                  onAddToCart={handleAddToCart}
                  onBuy={handleBuy}
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-sm">
                No feature courses available.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}   