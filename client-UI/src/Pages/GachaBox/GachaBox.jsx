import React, { useState, useEffect,useRef } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../Components/Button/Button';
import './gachabox.css';
import axios from 'axios';
import VirtualMC from '../../Components/EndUser/VirtualMC';
import { getAllTurns, getItemLists,getMyItems,playEvent, addItems } from '../../api';
const initialBanners = [
  {
    image: '/Images/banners/can_banner.png',
    character: 'can.png',
    exclude: ['jingyuan.png', 'yasuo.png'],
    title: 'Cái bình?',
    description: 'Tỉ Lệ Cầu Nguyện Tăng!',
    detail: 'Mỗi khi cầu nguyện 10 lần chắc chắn sẽ nhận được cái gì đó',
    additional: 'Chỉ có thể nhận được các nhân vật limited của mỗi banner sự kiện cầu nguyện đã được chỉ định. Xem chi tiết để biết thêm.'
  },
  {
    image: '/Images/banners/jingyuan_banner.png',
    character: 'jingyuan.png',
    exclude: ['can.png', 'yasuo.png'],
    title: 'Ngài',
    description: 'Tỉ Lệ Cầu Nguyện Tăng!',
    detail: 'Mỗi khi cầu nguyện 10 lần chắc chắn sẽ nhận được cái gì đó',
    additional: 'Chỉ có thể nhận được các nhân vật limited của mỗi banner sự kiện cầu nguyện đã được chỉ định. Xem chi tiết để biết thêm.'
  },
  {
    image: '/Images/banners/yasuo_banner.png',
    character: 'yasuo.png',
    exclude: ['can.png', 'jingyuan.png'],
    title: 'Hasameo',
    description: 'Tỉ Lệ Cầu Nguyện Tăng!',
    detail: 'Mỗi khi cầu nguyện 10 lần chắc chắn sẽ nhận được cái gì đó',
    additional: 'Chỉ có thể nhận được các nhân vật limited của mỗi banner sự kiện cầu nguyện đã được chỉ định. Xem chi tiết để biết thêm.'
  }
];

const GachaBox = () => {
  const { eventId } = useParams();
  const [itemList, setItemList] = useState([]);
  const [result, setResult] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(1);
  const [banners, setBanners] = useState(initialBanners);
  const [showResult, setShowResult] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [showBagModal, setShowBagModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [bag, setBag] = useState([]);
  const [playCount, setPlayCount] = useState(0);
  const navigate = useNavigate();
  const virtualMCRef = useRef(null);

  useEffect(() => {
    console.log("Fetch")
    const fetchItems = async () => {
      try {
        const [listResponse, itemsResponse, playCountResponse] = await Promise.all([
          getItemLists('90b738ae-8733-4d65-8cfe-305c922722e4'),
          getMyItems(),
          getAllTurns(eventId) // Giả sử có endpoint này
        ]);
        if(!listResponse.data.data) {
          listResponse.data.data = []
        }
        console.log("itemList-state:",listResponse.data.data )

        setItemList(listResponse.data.data)
        if(!itemsResponse.data.data) {
          itemsResponse.data.data = []
        }
        console.log("bag:",itemsResponse.data.data);
        setBag(itemsResponse.data.data);
        setPlayCount(playCountResponse.data.data.turn);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
    virtualMCRef.current.speak(`Mỗi ngày, người chơi sẽ có 10 lượt cầu nguyện, mỗi lần cầu nguyện sẽ nhận được một vật phâm xứng đáng với sự kỳ vọng của người cầu nguyện. Hãy thu thập thật nhiều chiến lợi phẩm để có cơ hội đổi lấy voucher`);
    // virtualMCRef.current.speak(`Minh`);

  }, []);



  const handleGacha = async (subCount) => {
    if (playCount < subCount) {
      alert('Không đủ lượt chơi!Kiếm thêm lượt bằng cách chia sẻ FaceBook hoặc xin bạn bè');
      return;
    }
    const randomItems = [];
    const { character, exclude } = banners[currentBanner];
    console.log("itemList-handleGacha:", itemList)

    const allowedItems = itemList.filter(item => !exclude.includes(item.images) && item.images !== character);
    let hasSpecialCharacter = false;
    let newBag = [...bag];
    let newItems = []; // Array to store newly obtained items

    for (let i = 0; i < (subCount+1); i++) {
      const isSpecialCharacter = Math.random() < 0.5; // 10% chance
      let rolledItem;
      if (isSpecialCharacter) {
        rolledItem = itemList.find(item => item.images === character);
        if (rolledItem) {
          hasSpecialCharacter = true;
        }
      } else {
        rolledItem = allowedItems[Math.floor(Math.random() * allowedItems.length)];
      }
      if (rolledItem) {
        // Thêm trường item_type_id
        rolledItem = { ...rolledItem, item_type_id: rolledItem.id };
        
        randomItems.push(rolledItem);
        const itemIndex = newBag.findIndex(item => item.name === rolledItem.name);
        if (itemIndex !== -1) {
          newBag[itemIndex].number += 1;
        } else {
          newBag.push({ ...rolledItem, number: 1 });
        }

        // Add to newItems array
        const newItemIndex = newItems.findIndex(item => item.item_type_id === rolledItem.item_type_id);
        if (newItemIndex !== -1) {
          newItems[newItemIndex].number += 1;
        } else {
          newItems.push({ item_type_id: rolledItem.item_type_id, number: 1 });
        }
      }
    }
    console.log("newbag: ", newBag)
    setBag(newBag);
    setResult(randomItems);
    setVideoSrc(hasSpecialCharacter ? '/video2.mp4' : '/video1.mp4');
    setShowVideo(true);

    try {
      await Promise.all([
        addItems({ data: newItems }), // Send only new items to the server
        playEvent(eventId, { "number": subCount }) 
      ]);
      setPlayCount(prevCount => prevCount - subCount);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSpeakComplete = () => {
    // Có thể thêm logic sau khi MC nói xong ở đây
    console.log('MC đã nói xong');
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setResult([]);
  };

  const handleBannerClick = (index) => {
    if (index !== currentBanner) {
      const newBanners = [...banners];
      [newBanners[1], newBanners[index]] = [newBanners[index], newBanners[1]];
      setBanners(newBanners);
      setCurrentBanner(1);
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowResult(true);
  };

  const handleSkipVideo = () => {
    setShowVideo(false);
    setShowResult(true);
  };

  const handleBagModal = () => {
    setShowBagModal(true);
  };

  const handleDetailModal = () => {
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowBagModal(false);
    setShowDetailModal(false);
  };

  const handleResetBag = async () => {
    try {
      await axios.post('http://34.124.217.226:5000/reset-items');
      const response = await axios.get('http://34.124.217.226:5000/items');
      console.log('Reset items:', response.data);
      setBag(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const backgroundStyle = {
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    overflow: 'hidden',
    position: 'relative'
  };

  const buttonStyle = {
    width: '250px',
    height: '80px',
    backgroundImage: 'url("/wish-button.png")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px',
    transition: 'transform 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'transparent'
  };

  const textStyle = {
    zIndex: 1,
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#5f3a22',
    margin: '0',
    padding: '0'
  };

  const subTextStyle = {
    zIndex: 1,
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#5f3a22',
    margin: '0',
    padding: '0'
  };
  

  const bagModalContent = (
    <div className="modal-content">
      <h2>Túi đồ</h2>
      <div className="bag-items">
        {bag.map((item, index) => (
          <div key={index} className="bag-item">
            <img src={`/Images/characters/${item.images}`} alt={item.name} />
            <div>{item.name} x {item.number}</div>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={handleResetBag}>Gift</button>
      <button className="close-button" onClick={handleCloseModal}>Close</button>
    </div>
  );

  const detailModalContent = (
    <div className="modal-content">
      <h2>Chi Tiết Cầu Nguyện</h2>
      <div className="detail-items">
        {itemList.map((item, index) => (
          <div key={index} className="detail-item">
            {item.name} - {item.images === banners[currentBanner].character ? '0.05%' : (99.95 / (itemList.length - 1)).toFixed(2) + '%'}
          </div>
        ))}
      </div>
      <button className="close-button" onClick={handleCloseModal}>Close</button>
    </div>
  );

  return (
    <div style={backgroundStyle}>
      <CustomButton content={"HomePage"} onClickHandle={() => { navigate('/')}}/>
      <div className="play-count">Số lượt chơi còn lại: {playCount}</div>
      <VirtualMC ref={virtualMCRef} onSpeakComplete={handleSpeakComplete} />
      <div className="banner-container">
        {banners.map((banner, index) => (
          <div key={index} className={`banner-wrapper ${index === 1 ? 'center' : 'side'}`} onClick={() => handleBannerClick(index)}>
            <img
              src={banner.image}
              alt={`Banner ${index}`}
              className={`banner ${index === 1 ? 'center' : 'side'}`}
            />
            {index === 1 && (
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <p>{banner.description}</p>
                <br />
                <p>{banner.detail}</p>
                <br />
                <p>{banner.additional}</p>
                <br />
                <button className="detail-button" onClick={handleDetailModal}>Thông Tin Chi Tiết</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={() => handleGacha(1)}
        >
          <p style={textStyle}>Cầu Nguyện ×1</p>
          <p style={subTextStyle}>× 1</p>
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={() => handleGacha(10)}
        >
          <p style={textStyle}>Cầu Nguyện ×10</p>
          <p style={subTextStyle}>× 10</p>
        </button>
      </div>
      <button className="bag-button" onClick={handleBagModal}>Túi đồ</button>
      {showVideo && (
        <div className="video-overlay">
          <video src={videoSrc} autoPlay onEnded={handleVideoEnd} className="fullscreen-video">
            Your browser does not support the video tag.
          </video>
          <button className="skip-button" onClick={handleSkipVideo}>Skip</button>
        </div>
      )}
      {showResult && (
        <div className="result-overlay">
          <div className="result">
            {result.map((item, index) => (
              <div key={index} className={`result-item ${item.images === banners[currentBanner].character ? 'limited' : ''}`}>
                <img src={`/Images/characters/${item.images}`} alt={item.name} />
                <div>{item.name}</div>
              </div>
            ))}
          </div>
          <button className="close-button" onClick={handleCloseResult}>Close</button>
        </div>
      )}
      {showBagModal && (
        <div className="modal-overlay">
          {bagModalContent}
        </div>
      )}
      {showDetailModal && (
        <div className="modal-overlay">
          {detailModalContent}
        </div>
      )}
    </div>
  );
};

export default GachaBox;