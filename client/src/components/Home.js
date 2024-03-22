import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const createRoomId = Math.random(1,100);

  useEffect(() => {
    socket.on('joinRoomResponse', (data) => {
      if (data) {
        navigate('/chat');
      } else {
        alert('该房间不存在')
      }
    })
    // return ()=> socket.off('joinRoomResponse', ()=>{});
  }, [socket]);

  const handleJoinRoom = () => {
    // 发送用户名和socketID到服务器
    socket.emit('joinRoom', {roomId})
  };

  const handleCreateRoom = () => {
    socket.emit('newRoom', {createRoomId})
    navigate('/chat');
  };

  return (
    <div className='home__container'>
      <h2 className="home__header">加入房间</h2>
      <label htmlFor="username">房间号</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username__input"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button className="home__cta" onClick={handleJoinRoom}>加入</button>
      <button className="home__cta" onClick={handleCreateRoom}>创建房间</button>
    </div>

  );
};

export default Home;
