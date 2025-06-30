import React from "react";

const ToggleSwitch = ({ checked, onChange, disabled = false, small = false }) => (
    <label style={{
        display: "inline-block ",
        width: small ? 35 : 50,
        height: small ? 20 : 28,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
    }}>
        <input
            id="toggle-switch"
            name="toggle-switch"
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            style={{ display: "none" }}
        />
        <span style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: checked ? "#3b82f6" : "#ccc",
            borderRadius: small ? 18 : 28,
            transition: "background 0.2s",
        }} />
        <span style={{
            position: "absolute",
            top: small ? 2 : 3,
            left: checked ? (small ? 16 : 26) : 3,
            width: small ? 15 : 22,
            height: small ? 15 : 22,
            background: "#fff",
            borderRadius: "50%",
            transition: "left 0.2s",
            boxShadow: "0 1px 4px rgba(0,0,0, 0.4)",
        }} />
    </label>
);

export default ToggleSwitch; 