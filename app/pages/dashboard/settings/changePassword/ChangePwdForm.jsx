"use client"
import { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { validatePassword } from 'app/helpers/validatePwd'
import { changePassword } from 'app/lib/actions/authActions'
import { setError } from 'app/features/modalSlice'
import { useDispatch } from 'react-redux'
import Button from 'app/components/buttons/Button'
import SubTitle from 'app/components/SubTitle'
import PwdStrengthCheck from 'app/pages/authentication/signUpSection/signUp/PwdStrengthCheck'

const ChangePwdForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPwd, setShowPwd] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPwd(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setError(''));

    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword) {
      dispatch(setError('Current password is required'));
      setLoading(false);
      return;
    }

    if (!validatePassword({ password: newPassword, confirmPassword, dispatch, setError })) {
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      dispatch(setError('New password must be different from current password'));
      setLoading(false);
      return;
    }

    try {
      const { error, message } = await changePassword(currentPassword, newPassword);
      if (error) {
        dispatch(setError(error));
      } else {
        dispatch(setError({ message, type: 'success' }));
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch {
      dispatch(setError('An unexpected error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: 'Current Password', name: 'currentPassword', show: showPwd.currentPassword },
    { label: 'New Password', name: 'newPassword', show: showPwd.newPassword },
    { label: 'Confirm New Password', name: 'confirmPassword', show: showPwd.confirmPassword },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 center flex-col mt-4">
      {fields.map(({ label, name, show }) => (
        <div key={name} className="space-y-1 w-full">
          <SubTitle>{label}</SubTitle>
          <div className="relative">
            <input
              id={name}
              type={show ? 'text' : 'password'}
              value={form[name]}
              onChange={(e) => handleChange(name, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility(name)}
              className="absolute right-3 top-1/2 transform duration-300 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
          {name === 'newPassword' && <PwdStrengthCheck password={form.newPassword} />}
        </div>
      ))}
      <Button
        type="blue"
        loading={loading}
        disabled={loading || Object.values(form).some(val => !val)}
      >
        {loading ? 'Changing Password...' : 'Change Password'}
      </Button>
    </form>
  )
}

export default ChangePwdForm
