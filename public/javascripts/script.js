
const socket=io()
const videogrid=document.getElementById('video-grid')
const mypeer=new Peer();

const myvideo=document.createElement('video');
myvideo.muted=true;
const peers={};
navigator.mediaDevices.getUserMedia({
    video: true,
    audio:true
}).then(stream =>
{
    addVideosStream(myvideo, stream);
    mypeer.on('call', call =>
    {
        call.answer(stream);
        const video=document.createElement('video')
        call.on('stream', userVideoStream =>
        {
            addVideosStream(video,userVideoStream)
        })
    
    })
    socket.on('user-connected', userId =>
    {
        connectToNewUser(userId,stream)
    })
})

 socket.on('user-disconnected', userId =>
    {
     if (peers[userId]) {peers[userId].close()}
    })
mypeer.on('open', id =>
{
    socket.emit('join-room', room_Id, id)
   
})

socket.on("connect", () =>
{
    console.log('connect from script')
    console.log(room_Id)
})

function connectToNewUser(userId, stream)
{
  
    const call=mypeer.call(userId, stream)
    const video=document.createElement('video')
    call.on('stream', userVideoStream =>
    {
        addVideosStream(video,userVideoStream)
    })
    call.on('close', () =>
    {
        video.remove()
    })
    peers[userId]=call
}

function addVideosStream(video, stream){
    video.srcObject=stream
    video.addEventListener('loadedmetadata', () =>
    {
        video.play()
    })
    videogrid.append(video)
    
}