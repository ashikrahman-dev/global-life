import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '../../assets/images/demo-profile-avatar.png';
import HappingNext from '../../components/happingNext/HappingNext';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import './userDetails.scss';

const UserDetails = () => {
    const { id } = useParams();

    const { user } = useAuth();

    const [limit, setLimit] = useState(8);

    const [followUser, setFollowUser] = useState(0);
    const [isFollowedUser, setIsFollowedUser] = useState(false);

    const { data } = useFetch(`https://global-life-api.onrender.com/api/users/${id}`);

    const { data: allpost, loading } = useFetch(`https://global-life-api.onrender.com/api/users/${id}/allpost?limit=${limit}`);


    useEffect(() => {
        setIsFollowedUser(data?.followers?.includes(user?._id));
        setFollowUser(data?.followers?.length);
    }, [user?._id, data?.followers, data?.followers?.length]);


    const handleUserFollow = () => {
        if (user?._id) {
            if (user?._id !== data?._id) {
                try {
                    axios.put(`https://global-life-api.onrender.com/api/users/${id}/follow`, { userId: user?._id });

                      setFollowUser(isFollowedUser ? followUser - 1 : followUser + 1);
                    setIsFollowedUser(!isFollowedUser);
                } catch (err) {
                    console.log(err);
                }
            } else {
                toast.error("You can not follow yourself");
            }
        } else {
            toast.error("You have to login for follow the User");
        }
    };

    const handleLoadMore = () => {
        setLimit((pre) => pre + 8);
    };

    return (
        <div>
            <section className="userDetailsBanner"></section>
            <section className="pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="">
                                <div className="profile-info p-5">
                                    <div className="text-center">
                                        <img src={data?.profilePic ? data?.profilePic : Avatar} alt={data?.name} className="rounded-circle" height={96} width={96} />
                                    </div>
                                    <h2 className="text-center fs-48 text-clr-dark-1 my-4">{data?.name}</h2>

                                    {user?.username !== data?.username && (
                                        <div className="text-center">
                                            <button className="bg-green border-0 rounded-pill text-white text-uppercase ff-inter py-2 px-4" onClick={handleUserFollow}>
                                                {isFollowedUser ? "Unfollow" : "Follow"}
                                            </button>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-center my-4 gap-3">
                                        <span className="bg-lavender rounded-pill fs-12 text-uppercase py-1 px-3 ff-inter text-dark1 fw-semiBold">{followUser} followers</span>
                                        <span className="bg-sky-blue rounded-pill fs-12 text-uppercase py-1 px-3 ff-inter text-dark1 fw-semiBold">{data?.followings?.length} Following</span>
                                    </div>

                                    <div className="item-box d-flex align-items-center">
                                        <div className="item d-flex">
                                            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.4" cx="28.5" cy="28.5" r="28.5" fill="#B0DDFF" />
                                                <path
                                                    d="M36.625 18.625C36.5359 18.625 36.4445 18.6414 36.3531 18.6789L22.8437 24.107H19C18.7937 24.107 18.625 24.2805 18.625 24.4961V31.5039C18.625 31.7195 18.7937 31.893 19 31.893H21.3836C21.2969 32.1648 21.25 32.4531 21.25 32.7461C21.25 34.2906 22.5109 35.5469 24.0625 35.5469C25.3609 35.5469 26.4555 34.6656 26.7789 33.475L36.3555 37.3234C36.4469 37.3586 36.5383 37.3773 36.6273 37.3773C37.0234 37.3773 37.3773 37.0445 37.3773 36.5992V19.4031C37.375 18.9578 37.0234 18.625 36.625 18.625ZM24.0625 33.8664C23.4414 33.8664 22.9375 33.3648 22.9375 32.7461C22.9375 32.4836 23.0289 32.2328 23.1953 32.0336L25.1852 32.8328C25.1383 33.4094 24.6531 33.8664 24.0625 33.8664ZM35.6875 35.2352L23.4719 30.3273L23.1695 30.2055H20.3125V25.7945H23.1695L23.4719 25.6727L35.6875 20.7648V35.2352Z"
                                                    fill="#4D585F"
                                                />
                                            </svg>
                                            <div>
                                                <p className="mb-1 fs-14 ff-inter text-clr-dark-2">Phone</p>

                                                <h5 className="mb-0 fs-18 ff-inter text-clr-dark-1">{data?.phone} </h5>
                                            </div>
                                        </div>
                                        <div className="item d-flex">
                                            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.4" cx="28.5" cy="28.5" r="28.5" fill="#A7FFDA" />
                                                <path
                                                    d="M36.1212 33.8969C35.679 32.8496 35.0374 31.8984 34.2321 31.0961C33.4292 30.2915 32.4781 29.65 31.4313 29.207C31.4219 29.2023 31.4126 29.2 31.4032 29.1953C32.8633 28.1406 33.8126 26.4227 33.8126 24.4844C33.8126 21.2734 31.211 18.6719 28.0001 18.6719C24.7891 18.6719 22.1876 21.2734 22.1876 24.4844C22.1876 26.4227 23.1368 28.1406 24.5969 29.1977C24.5876 29.2023 24.5782 29.2047 24.5688 29.2094C23.5188 29.6523 22.5766 30.2875 21.768 31.0984C20.9634 31.9013 20.3219 32.8524 19.879 33.8992C19.4438 34.924 19.2091 36.0228 19.1876 37.1359C19.1869 37.161 19.1913 37.1858 19.2005 37.2091C19.2096 37.2324 19.2233 37.2537 19.2408 37.2716C19.2583 37.2895 19.2791 37.3037 19.3022 37.3134C19.3253 37.3231 19.35 37.3281 19.3751 37.3281H20.7813C20.8844 37.3281 20.9665 37.2461 20.9688 37.1453C21.0157 35.3359 21.7422 33.6414 23.0266 32.357C24.3555 31.0281 26.1204 30.2969 28.0001 30.2969C29.8797 30.2969 31.6446 31.0281 32.9735 32.357C34.2579 33.6414 34.9844 35.3359 35.0313 37.1453C35.0337 37.2484 35.1157 37.3281 35.2188 37.3281H36.6251C36.6501 37.3281 36.6749 37.3231 36.6979 37.3134C36.721 37.3037 36.7419 37.2895 36.7593 37.2716C36.7768 37.2537 36.7905 37.2324 36.7997 37.2091C36.8088 37.1858 36.8132 37.161 36.8126 37.1359C36.7891 36.0156 36.5571 34.9258 36.1212 33.8969ZM28.0001 28.5156C26.9243 28.5156 25.9118 28.0961 25.1501 27.3344C24.3883 26.5727 23.9688 25.5602 23.9688 24.4844C23.9688 23.4086 24.3883 22.3961 25.1501 21.6344C25.9118 20.8727 26.9243 20.4531 28.0001 20.4531C29.0758 20.4531 30.0883 20.8727 30.8501 21.6344C31.6118 22.3961 32.0313 23.4086 32.0313 24.4844C32.0313 25.5602 31.6118 26.5727 30.8501 27.3344C30.0883 28.0961 29.0758 28.5156 28.0001 28.5156Z"
                                                    fill="#4D585F"
                                                />
                                            </svg>

                                            <div>
                                                <p className="mb-1 fs-14 ff-inter text-clr-dark-2">Email</p>
                                                <h5 className="mb-0 fs-18 ff-inter text-clr-dark-1">{data?.email}</h5>
                                            </div>
                                        </div>
                                        <div className="item d-flex">
                                            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.4" cx="28.5" cy="28.5" r="28.5" fill="#FFC9C9" />
                                                <path
                                                    d="M28.3438 26.3852V28.375H26.3633C26.2672 28.375 26.1875 28.4477 26.1875 28.5391V29.5234C26.1875 29.6125 26.2672 29.6875 26.3633 29.6875H28.3438V31.6773C28.3438 31.7688 28.4187 31.8438 28.5078 31.8438H29.4922C29.5836 31.8438 29.6562 31.7688 29.6562 31.6773V29.6875H31.6367C31.7328 29.6875 31.8125 29.6125 31.8125 29.5234V28.5391C31.8125 28.4477 31.7328 28.375 31.6367 28.375H29.6562V26.3852C29.6562 26.2938 29.5836 26.2188 29.4922 26.2188H28.5078C28.4187 26.2188 28.3438 26.2938 28.3438 26.3852ZM37.625 22.9937H29.2109L26.4617 20.3641C26.4267 20.3313 26.3807 20.3129 26.3328 20.3125H20.375C19.9602 20.3125 19.625 20.6477 19.625 21.0625V34.9375C19.625 35.3523 19.9602 35.6875 20.375 35.6875H37.625C38.0398 35.6875 38.375 35.3523 38.375 34.9375V23.7437C38.375 23.3289 38.0398 22.9937 37.625 22.9937ZM36.6875 34H21.3125V22H25.7305L28.5336 24.6812H36.6875V34Z"
                                                    fill="#4D585F"
                                                />
                                            </svg>

                                            <div>
                                                <p className="mb-1 fs-14 ff-inter text-clr-dark-2">Country</p>
                                                <h5 className="mb-0 fs-18 ff-inter text-clr-dark-1">{data?.location}</h5>
                                            </div>
                                        </div>
                                        <div className="item d-flex">
                                            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.4" cx="28.5" cy="28.5" r="28.5" fill="#E1DEFF" />
                                                <path
                                                    d="M24.8085 24.6667C25.4186 23.372 27.0649 22.4444 29.0001 22.4444C31.4547 22.4444 33.4445 23.9368 33.4445 25.7778C33.4445 27.3327 32.0249 28.639 30.1047 29.0073C29.5021 29.1229 29.0001 29.6086 29.0001 30.2222M29 33.5556H29.0111M39 28C39 33.5228 34.5228 38 29 38C23.4772 38 19 33.5228 19 28C19 22.4772 23.4772 18 29 18C34.5228 18 39 22.4772 39 28Z"
                                                    stroke="#4D585F"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </svg>

                                            <div>
                                                <p className="mb-1 fs-14 ff-inter text-clr-dark-2">Marital Status</p>
                                                <h5 className="mb-0 fs-18 ff-inter text-clr-dark-1">{data?.maritalStatus}</h5>
                                            </div>
                                        </div>
                                        <div className="item d-flex">
                                            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.4" cx="28.5" cy="28.5" r="28.5" fill="#EBE49B" />
                                                <path
                                                    d="M38.2831 24.2746L32.3323 23.4098L29.6722 18.0168C29.5995 17.8691 29.48 17.7496 29.3323 17.677C28.962 17.4941 28.512 17.6465 28.3268 18.0168L25.6667 23.4098L19.7159 24.2746C19.5518 24.2981 19.4018 24.3754 19.287 24.4926C19.1482 24.6353 19.0716 24.8273 19.0743 25.0264C19.0769 25.2254 19.1585 25.4153 19.3011 25.5543L23.6065 29.752L22.5893 35.6793C22.5655 35.8172 22.5807 35.959 22.6334 36.0886C22.686 36.2183 22.7739 36.3306 22.8872 36.4128C23.0004 36.4951 23.1344 36.5439 23.2739 36.5539C23.4135 36.5638 23.5531 36.5345 23.6768 36.4692L28.9995 33.6707L34.3222 36.4692C34.4675 36.5465 34.6362 36.5723 34.7979 36.5441C35.2057 36.4738 35.48 36.0871 35.4097 35.6793L34.3925 29.752L38.6979 25.5543C38.8151 25.4395 38.8925 25.2895 38.9159 25.1254C38.9792 24.7152 38.6932 24.3356 38.2831 24.2746ZM32.5807 29.1613L33.4268 34.0902L28.9995 31.7652L24.5722 34.0926L25.4182 29.1637L21.837 25.6715L26.787 24.952L28.9995 20.4684L31.212 24.952L36.162 25.6715L32.5807 29.1613Z"
                                                    fill="#4D585F"
                                                />
                                            </svg>

                                            <div>
                                                <p className="mb-1 fs-14 ff-inter text-clr-dark-2">Reviews</p>
                                                <h5 className="mb-0 fs-18 ff-inter text-clr-dark-1">240</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex flex-wrap">
                                        <div className="w-25">
                                            <h4 className="mb-0">Bio</h4>
                                        </div>
                                        <div className="w-50">
                                            <p className="ff-inter text-dark2 mb-0">{data?.bio}</p>
                                        </div>
                                        <div className="d-flex gap-3 justify-content-end w-25">
                                            <a href={data?.fb}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_11515_12539)">
                                                        <path
                                                            d="M20.5 10C20.5 4.47715 16.0229 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 14.9912 4.15684 19.1283 8.9375 19.8785V12.8906H6.39844V10H8.9375V7.79688C8.9375 5.29063 10.4305 3.90625 12.7146 3.90625C13.8084 3.90625 14.9531 4.10156 14.9531 4.10156V6.5625H13.6922C12.45 6.5625 12.0625 7.3334 12.0625 8.125V10H14.8359L14.3926 12.8906H12.0625V19.8785C16.8432 19.1283 20.5 14.9912 20.5 10Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11515_12539">
                                                            <rect width="20" height="20" fill="white" transform="translate(0.5)"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                            <a href={data?.tweet}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_11515_12542)">
                                                        <path
                                                            d="M6.7918 18.1246C14.3371 18.1246 18.4652 11.8719 18.4652 6.45119C18.4652 6.2754 18.4613 6.09572 18.4535 5.91993C19.2566 5.33919 19.9496 4.61985 20.5 3.79572C19.7521 4.12847 18.958 4.34579 18.1449 4.44025C19.0011 3.92706 19.6421 3.12086 19.9492 2.17111C19.1438 2.64843 18.263 2.98514 17.3445 3.16681C16.7257 2.50927 15.9075 2.0739 15.0164 1.92801C14.1253 1.78212 13.211 1.93384 12.4148 2.35971C11.6186 2.78559 10.9848 3.46189 10.6115 4.28406C10.2382 5.10623 10.1462 6.02848 10.3496 6.90822C8.71874 6.82638 7.12328 6.40272 5.66665 5.66472C4.21002 4.92671 2.92474 3.89083 1.89414 2.62423C1.37033 3.52734 1.21005 4.59601 1.44586 5.61304C1.68167 6.63008 2.29589 7.51917 3.16367 8.09962C2.51219 8.07894 1.87498 7.90353 1.30469 7.5879V7.63868C1.3041 8.58643 1.63175 9.50512 2.23192 10.2386C2.8321 10.9721 3.66777 11.4751 4.59687 11.6621C3.99338 11.8272 3.35999 11.8513 2.7457 11.7324C3.00788 12.5475 3.51798 13.2604 4.20481 13.7716C4.89164 14.2828 5.72093 14.5668 6.57695 14.584C5.12369 15.7256 3.32848 16.3447 1.48047 16.3418C1.15274 16.3413 0.825333 16.3212 0.5 16.2817C2.37738 17.4861 4.56128 18.1258 6.7918 18.1246Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11515_12542">
                                                            <rect width="20" height="20" fill="white" transform="translate(0.5)"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                            <a href={data?.insta}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_11515_12545)">
                                                        <path
                                                            d="M10.5 1.80078C13.1719 1.80078 13.4883 1.8125 14.5391 1.85937C15.5156 1.90234 16.043 2.06641 16.3945 2.20312C16.8594 2.38281 17.1953 2.60156 17.543 2.94922C17.8945 3.30078 18.1094 3.63281 18.2891 4.09766C18.4258 4.44922 18.5898 4.98047 18.6328 5.95312C18.6797 7.00781 18.6914 7.32422 18.6914 9.99219C18.6914 12.6641 18.6797 12.9805 18.6328 14.0312C18.5898 15.0078 18.4258 15.5352 18.2891 15.8867C18.1094 16.3516 17.8906 16.6875 17.543 17.0352C17.1914 17.3867 16.8594 17.6016 16.3945 17.7812C16.043 17.918 15.5117 18.082 14.5391 18.125C13.4844 18.1719 13.168 18.1836 10.5 18.1836C7.82812 18.1836 7.51172 18.1719 6.46094 18.125C5.48438 18.082 4.95703 17.918 4.60547 17.7812C4.14062 17.6016 3.80469 17.3828 3.45703 17.0352C3.10547 16.6836 2.89062 16.3516 2.71094 15.8867C2.57422 15.5352 2.41016 15.0039 2.36719 14.0312C2.32031 12.9766 2.30859 12.6602 2.30859 9.99219C2.30859 7.32031 2.32031 7.00391 2.36719 5.95312C2.41016 4.97656 2.57422 4.44922 2.71094 4.09766C2.89062 3.63281 3.10937 3.29687 3.45703 2.94922C3.80859 2.59766 4.14062 2.38281 4.60547 2.20312C4.95703 2.06641 5.48828 1.90234 6.46094 1.85937C7.51172 1.8125 7.82812 1.80078 10.5 1.80078ZM10.5 0C7.78516 0 7.44531 0.0117187 6.37891 0.0585937C5.31641 0.105469 4.58594 0.277344 3.95312 0.523437C3.29297 0.78125 2.73438 1.12109 2.17969 1.67969C1.62109 2.23437 1.28125 2.79297 1.02344 3.44922C0.777344 4.08594 0.605469 4.8125 0.558594 5.875C0.511719 6.94531 0.5 7.28516 0.5 10C0.5 12.7148 0.511719 13.0547 0.558594 14.1211C0.605469 15.1836 0.777344 15.9141 1.02344 16.5469C1.28125 17.207 1.62109 17.7656 2.17969 18.3203C2.73438 18.875 3.29297 19.2187 3.94922 19.4727C4.58594 19.7187 5.3125 19.8906 6.375 19.9375C7.44141 19.9844 7.78125 19.9961 10.4961 19.9961C13.2109 19.9961 13.5508 19.9844 14.6172 19.9375C15.6797 19.8906 16.4102 19.7187 17.043 19.4727C17.6992 19.2187 18.2578 18.875 18.8125 18.3203C19.3672 17.7656 19.7109 17.207 19.9648 16.5508C20.2109 15.9141 20.3828 15.1875 20.4297 14.125C20.4766 13.0586 20.4883 12.7187 20.4883 10.0039C20.4883 7.28906 20.4766 6.94922 20.4297 5.88281C20.3828 4.82031 20.2109 4.08984 19.9648 3.45703C19.7187 2.79297 19.3789 2.23437 18.8203 1.67969C18.2656 1.125 17.707 0.78125 17.0508 0.527344C16.4141 0.28125 15.6875 0.109375 14.625 0.0625C13.5547 0.0117188 13.2148 0 10.5 0Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                        <path
                                                            d="M10.5 4.86328C7.66406 4.86328 5.36328 7.16406 5.36328 10C5.36328 12.8359 7.66406 15.1367 10.5 15.1367C13.3359 15.1367 15.6367 12.8359 15.6367 10C15.6367 7.16406 13.3359 4.86328 10.5 4.86328ZM10.5 13.332C8.66016 13.332 7.16797 11.8398 7.16797 10C7.16797 8.16016 8.66016 6.66797 10.5 6.66797C12.3398 6.66797 13.832 8.16016 13.832 10C13.832 11.8398 12.3398 13.332 10.5 13.332Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                        <path
                                                            d="M17.0391 4.66016C17.0391 5.32422 16.5 5.85938 15.8398 5.85938C15.1758 5.85938 14.6406 5.32032 14.6406 4.66016C14.6406 3.99609 15.1797 3.46094 15.8398 3.46094C16.5 3.46094 17.0391 4 17.0391 4.66016Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11515_12545">
                                                            <rect width="20" height="20" fill="white" transform="translate(0.5)"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                            <a href={data?.linkedin}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_11515_12548)">
                                                        <path
                                                            d="M19.0195 0H1.97656C1.16016 0 0.5 0.644531 0.5 1.44141V18.5547C0.5 19.3516 1.16016 20 1.97656 20H19.0195C19.8359 20 20.5 19.3516 20.5 18.5586V1.44141C20.5 0.644531 19.8359 0 19.0195 0ZM6.43359 17.043H3.46484V7.49609H6.43359V17.043ZM4.94922 6.19531C3.99609 6.19531 3.22656 5.42578 3.22656 4.47656C3.22656 3.52734 3.99609 2.75781 4.94922 2.75781C5.89844 2.75781 6.66797 3.52734 6.66797 4.47656C6.66797 5.42188 5.89844 6.19531 4.94922 6.19531ZM17.543 17.043H14.5781V12.4023C14.5781 11.2969 14.5586 9.87109 13.0352 9.87109C11.4922 9.87109 11.2578 11.0781 11.2578 12.3242V17.043H8.29688V7.49609H11.1406V8.80078H11.1797C11.5742 8.05078 12.543 7.25781 13.9844 7.25781C16.9883 7.25781 17.543 9.23438 17.543 11.8047V17.043Z"
                                                            fill="#969EA3"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11515_12548">
                                                            <rect width="20" height="20" fill="white" transform="translate(0.5)"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <div className="container">
                    <hr />
                    <h3 className="fs-36 text-dark1 text-center">Posting</h3>
                    <hr />
                    <div className="events-post-area">
                        <div className="happeningNextWrapper mt-4">
                            <div className="row">
                                <div className="d-flex justify-content-center align-items-center h-50">
                                    {loading && (
                                        <div>
                                            <Spinner animation="grow" variant="warning" />
                                        </div>
                                    )}
                                </div>

                                {!loading && allpost?.myEvents?.map((event) => <HappingNext key={event?._id} event={event} />)}

                                {allpost?.myEvents?.length === 0 && <p className="text-clr-dark-4 ff-inter text-center">No Events Available</p>}

                                {!(allpost?.limit > allpost?.myEvents?.length) && (
                                <div className="d-flex justify-content-center mt-5">
                                        <button
                                            onClick={handleLoadMore}
                                            className="commonBtn ff-inter bg-green discoverBtn text-uppercase ls-1 d-flex align-items-center justify-content-center text-white fs-12"
                                        >
                                            <span>Load More</span>
                                        </button>
                                </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDetails;