"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import Loader from "@/components/Loader/Loader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
