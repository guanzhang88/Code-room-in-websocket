import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket, handleJoinRoom, isRoomIdValid }) => {
    const [users, setUsers] = useState([]);
    const [roomId, setRoomId] = useState('');
    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, users]);

    
    return (
        <div className="chat__sidebar">
            <h2>自由聊天</h2>
            {isRoomIdValid ? '': <span>该房间不存在</span>}
            <div className='room__btn__Box'>  
                <input value={roomId} onChange={(e) => setRoomId(e.target.value)} style={{padding: '10px'}}/>
                <button className='home__cta' onClick={()=>handleJoinRoom(roomId)}>加入房间</button>
                <button className='home__cta'>创建房间</button>
            </div>
            <div>
                <h4 className="chat__header">在线用户</h4>
                <div className="chat__users">
                    {users.map((user) => (
                        <p key={user.socketID}>{user.userName}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBar;
