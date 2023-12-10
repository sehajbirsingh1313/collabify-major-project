import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto text-center">
        <h1 className="text-[#000659] font-bold text-7xl lg:text-9xl">
          Collabify
        </h1>
        <h1 className="text-[#097969] font-bold text-3xl lg:text-5xl italic">
          Revolutionizing Creator - Brand Collaboration
        </h1>
        <h1 className="text-slate-700 font-bold text-1xl lg:text-4xl">
          Collaborate with upcoming{" "}
          <span className="text-slate-500">Influencers</span>
          <br />
        </h1>
        <h3 className="text-slate-700 font-bold text-xl lg:text-2xl">
          Let's make your brand a household name
        </h3>
        <div className="text-gray-700 text-lg sm:text-lg">
          Collabify is the most trusted platform to engage with micro content-creators and grow your brand at niche
          <br />
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-2xl text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      <div className="swiper-container">
        <Swiper navigation className="swiper-wrapper">
          <SwiperSlide className="swiper-slide">
            <img
              src="https://images.pexels.com/photos/7514830/pexels-photo-7514830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sample 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img
              src="https://images.pexels.com/photos/7481388/pexels-photo-7481388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Sample 2"
              className="w-full"
            />
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <img
              src="https://images.pexels.com/photos/6953993/pexels-photo-6953993.jpeg"
              alt="Sample 3"
              className="w-full"
            />
          </SwiperSlide>
          {/* Add more slides as needed */}
        </Swiper>
      </div>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true "}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent listing of Influencers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more influencers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Top rated Influencers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more Influencers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <h3 className='text-3xl font-extrabold mb-6 text-green-800 text-center'> A Project Made by - Sehajbir Singh (2004984)</h3>

    </div>
  );
}
