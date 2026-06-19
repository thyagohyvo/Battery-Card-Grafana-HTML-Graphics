.battery-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Inter, Arial;
  color: #e5e7eb;
}

/* BOXES */
.battery-box {
  background: #0b1220;
  border-radius: 14px;
  padding: 14px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

.label {
  font-size: 11px;
  color: #9ca3af;
}

.battery-box h1 {
  font-size: 32px;
  margin: 5px 0;
}

.status {
  font-size: 12px;
  font-weight: 600;
}

/* BATERIA */
.battery-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.battery-body {
  width: 80px;
  height: 180px;
  border-radius: 18px;
  border: 4px solid #9ca3af;
  padding: 4px;
  display: flex;
  align-items: flex-end;
  background: #020617;
}

#battery_fill {
  width: 100%;
  height: 0%;
  border-radius: 10px;
  background: #22c55e;
  transition: all 0.5s ease;
}

.battery-tip {
  width: 20px;
  height: 10px;
  background: #9ca3af;
  border-radius: 4px;
  margin-top: 4px;
}
