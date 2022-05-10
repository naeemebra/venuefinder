import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/shared/Spinner";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const params = useParams();

  useEffect(
    _ => {
      (async function () {
        setLoading(true);
        const docRef = doc(db, "users", params.landLordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLoading(false);
          setLandlord(docSnap.data());
        } else {
          setLoading(false);
          toast.error(
            "Could not get landlord data or user is currently not available"
          );
        }
      })();
    },
    [params.landLordId]
  );

  const handleChange = e => setMessage(e.target.value);

  if (loading) return <Spinner />;

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Receiver: {landlord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={handleChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}
