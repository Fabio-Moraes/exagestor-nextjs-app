//import { useWebSocket } from 'contexts/webSocket';

export function HandleLogout() {
  //const socket = useWebSocket();
  //if (socket) socket.disconnect();
  window.location.reload();
}
