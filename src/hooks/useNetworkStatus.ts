import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

// Tracks whether the DEVICE has a network connection (Wi-Fi/cellular). This is
// distinct from "the backend is down" — a failed request while online is a
// server error, handled per-screen with a retry. This only reports the device
// being offline.
export function useNetworkStatus(): { isOffline: boolean } {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isConnected is null until the first check — treat unknown as online so we
      // don't flash the banner on startup.
      setIsOffline(state.isConnected === false);
    });
    return () => unsubscribe();
  }, []);

  return { isOffline };
}
