import EmergencyStatusBar from "./navigation/EmergencyStatusBar";

import TabNavigation from "./navigation/TabNavigation";
import TrustSignalFooter from "./navigation/TrustSignalFooter";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background w-full">
      <EmergencyStatusBar />

      {/* GLOBAL PAGE CONTAINER */}
      <main className="pt-16 pb-32 lg:pb-24">
        <div className="
          w-full
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
          2xl:px-16
          max-w-[1600px]
          mx-auto
        ">
          {children}
        </div>
      </main>

      
      <TabNavigation />
      <TrustSignalFooter />
    </div>
  );
}
