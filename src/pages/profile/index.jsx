import React from "react";
import { Helmet } from "react-helmet";

import TabNavigation from "../../components/navigation/TabNavigation";
import EmergencyStatusBar from "../../components/navigation/EmergencyStatusBar";
import TrustSignalFooter from "../../components/navigation/TrustSignalFooter";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Image from "../../components/AppImage";
import Icon from "../../components/AppIcon";

const ProfilePage = () => {
  const profile = {
    name: "Vanshika Chitransh",
    phone: "+91 98765 43210",
    email: "vanshika@example.com",
    bloodGroup: "O-",
    medicalNotes: "Allergic to penicillin. Wears contact lenses.",
    avatar:
      "https://img.rocket.new/generatedImages/rocket_gen_img_1402ef150-1763296666361.png",
  };

  return (
    <>
      <Helmet>
        <title>Profile - Black Widow</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <EmergencyStatusBar />

        <main className="pt-16 pb-24">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">

            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              User Profile
            </h1>

            {/* PROFILE CARD */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative">
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary"
                />
                <div className="absolute bottom-1 right-1 bg-primary rounded-full p-2">
                  <Icon name="Camera" size={16} color="white" />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
                <p className="text-muted-foreground">Primary Account Holder</p>

                <div className="flex gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-success/20 text-success">
                    Identity Verified
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent">
                    Safety Shield Active
                  </span>
                </div>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PERSONAL DETAILS */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="User" size={18} /> Personal Details
                </h3>

                <div className="space-y-4">
                  <Input label="Full Name" value={profile.name} readOnly />
                  <Input label="Phone Number" value={profile.phone} readOnly />
                  <Input label="Email" value={profile.email} readOnly />
                </div>
              </div>

              {/* MEDICAL PROFILE */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="HeartPulse" size={18} /> Medical Profile
                </h3>

                <div className="space-y-4">
                  <Input label="Blood Group" value={profile.bloodGroup} readOnly />

                  <div>
                    <label className="text-sm text-muted-foreground">
                      Emergency Medical Notes
                    </label>
                    <textarea
                      className="w-full mt-1 bg-muted border border-border rounded-lg p-3 text-sm resize-none"
                      rows={4}
                      value={profile.medicalNotes}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ACCOUNT ACTIONS */}
            <div className="mt-10 bg-card border border-destructive/40 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-destructive mb-4">
                Account Actions
              </h3>

              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  Sign Out
                </Button>
                <Button variant="destructive" className="flex-1">
                  Delete Account
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Deleting your account will permanently erase your safety data.
              </p>
            </div>

          </div>
        </main>

        <TabNavigation />
        <TrustSignalFooter />
      </div>
    </>
  );
};

export default ProfilePage;
