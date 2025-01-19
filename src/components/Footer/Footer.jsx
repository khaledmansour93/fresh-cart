import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";

import appStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4">
          <header>
            <h2 className="text-xl font-semibold text-slate-800">
              Get the FreshCart app
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </header>

          <div className="flex gap-2">
            <input
              type="email"
              className="form-control grow"
              placeholder="Email Address"
            />
            <button className="btn text-sm uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold">
              Share App Link
            </button>
          </div>

          <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-partners flex gap-3 items-center">
              <h3>Payment Partners</h3>
              <img className="w-24" src={amazonPayLogo} alt="amazon-pay-logo" />
              <img
                className="w-24"
                src={americanExpressLogo}
                alt="american-express-logo"
              />
              <img
                className="w-20"
                src={masterCardLogo}
                alt="mastercard-logo"
              />
              <img className="w-24" src={paypalLogo} alt="paypal-logo" />
            </div>
            <div className="download flex gap-3 items-center">
              <h3>Get deliveries with FreshCart</h3>
              <img className="w-24" src={appStoreLogo} alt="app-store-logo" />
              <img
                className="w-[105px]"
                src={googlePlayLogo}
                alt="google-play-logo"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
