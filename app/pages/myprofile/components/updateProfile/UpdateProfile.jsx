"use client";
import Button from "app/components/buttons/Button";
import FlexBox from "app/components/containers/FlexBox";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import { setError } from "app/features/modalSlice";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { updateProfile } from "app/lib/actions/profileActions";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UpdateProfile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    address: "",
    lastName: "",
    firstName: "",
    company: "",
    country: "",
    city: "",
    sex: "",
    userBirthDate: "",
    linkedin_url: "",
    twitter_url: "",
    web_url: "",
    position: "",
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user?.profile) {
      setFormData({
        userName: user.profile.userName || user.email?.split("@")[0] || "",
        phone: user.profile.phone || "",
        address: user.profile.address || "",
        lastName: user.profile.lastName || "",
        firstName: user.profile.firstName || "",
        company: user.profile.company || "",
        country: user.profile.country || "",
        city: user.profile.city || "",
        sex: user.profile.sex || "",
        userBirthDate: user.profile.userBirthDate || "",
        linkedin_url: user.profile.linkedin_url || "",
        twitter_url: user.profile.twitter_url || "",
        web_url: user.profile.web_url || "",
        position: user.profile.position || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cleanFormData = (data) => {
    const cleaned = {};
    for (const key in data) {
      if (data[key] !== "") {
        cleaned[key] = data[key];
      } else {
        cleaned[key] = null;
      }
    }
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      dispatch(setError("User not found. Please try refreshing the page."));
      return;
    }
    setLoading(true);
    try {
      const cleanedData = cleanFormData(formData);
      const { data, error } = await updateProfile(user.id, cleanedData);
      if (error) {
        dispatch(setError(error));
        setLoading(false);
        return;
      }
      dispatch(updateUserProfile(data));
      dispatch(
        setError({
          message: "Profile updated successfully!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(setError("Failed to update profile. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <MotionContainer animation="fade-in">
      <FormContainer>
        <form className="center flex-col space-y-5" onSubmit={handleSubmit}>
          <FlexBox type="column">
            <Title>Update Profile</Title>
            <Paragraph>Your current information</Paragraph>
          </FlexBox>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 w-full md:px-5">
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                autoComplete="true"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="true"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="true"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label htmlFor="userBirthDate">Birth Date</label>
              <input
                type="date"
                id="userBirthDate"
                name="userBirthDate"
                autoComplete="true"
                value={formData.userBirthDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="true"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                autoComplete="true"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                autoComplete="true"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
              />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                autoComplete="true"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label htmlFor="sex">Gender</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                autoComplete="true"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label htmlFor="linkedin_url">LinkedIn URL</label>
              <input
                type="url"
                id="linkedin_url"
                name="linkedin_url"
                autoComplete="true"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="Enter your LinkedIn profile URL"
              />
            </div>

            <div>
              <label htmlFor="twitter_url">Twitter URL</label>
              <input
                type="url"
                id="twitter_url"
                name="twitter_url"
                autoComplete="true"
                value={formData.twitter_url}
                onChange={handleChange}
                placeholder="Enter your Twitter profile URL"
              />
            </div>

            <div>
              <label htmlFor="web_url">Website URL</label>
              <input
                type="url"
                id="web_url"
                name="web_url"
                autoComplete="true"
                value={formData.web_url}
                onChange={handleChange}
                placeholder="Enter your website URL"
              />
            </div>

            <div>
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                autoComplete="true"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter your position"
              />
            </div>
          </div>

          <Button type="submit" loading={loading}>
            Update Profile
          </Button>
        </form>
      </FormContainer>
    </MotionContainer>
  );
};

export default UpdateProfile;
