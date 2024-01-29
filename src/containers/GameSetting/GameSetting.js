import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HOST_URL } from "../../config/config";
import Header from "../layout/header";
import Sidebar from "../layout/sidebar";

export default function GameSetting() {
  const [startGoldAmount, setStartGoldAmount] = useState(0);
  const [startHP, setStartHP] = useState(0);
  const [maxHP, setMaxHP] = useState(0);
  const [turnTime, setTurnTime] = useState(0);
  const [goldBonusForKill, setGoldBonusForKill] = useState(0);
  const [goldBonusForRetire, setGoldBonusForRetire] = useState(0);
  const [
    elementalAttackBonusDamageOccurrence,
    setElementalAttackBonusDamageOccurrence,
  ] = useState(0);
  const [elementalAttackBonusDamage, setElementalAttackBonusDamage] =
    useState(0);
  const [increaseDuelPointBy, setIncreaseDuelPointBy] = useState(0);
  const [increaseDuelExpBy, setIncreaseDuelExpBy] = useState(0);
  const [decreaseDuelPointBy, setDecreaseDuelPointBy] = useState(0);
  const [decreaseDuelExpBy, setDecreaseDuelExpBy] = useState(0);

  useEffect(() => {
    axios.get(HOST_URL + "getGameSetting").then((res) => {
      console.log(res);
      setStartGoldAmount(parseFloat(res.data.playerSetting.StartGoldAmount));
      setStartHP(res.data.playerSetting.StartHP);
      setMaxHP(res.data.playerSetting.MaxHP);
      setTurnTime(res.data.gameSetting.TurnTime);
      setGoldBonusForKill(res.data.gameSetting.GoldBonusForKill);
      setGoldBonusForRetire(res.data.gameSetting.GoldBonusForRetire);
      setElementalAttackBonusDamageOccurrence(
        res.data.gameSetting.ElementalBonusOccurancePercent
      );
      setElementalAttackBonusDamage(res.data.gameSetting.ElementalBonusDamage);
      setIncreaseDuelPointBy(res.data.gameSetting.DuelPointIncrease);
      setIncreaseDuelExpBy(res.data.gameSetting.DuelExpWon);
      setDecreaseDuelPointBy(res.data.gameSetting.DuelPointDecrease);
      setDecreaseDuelExpBy(res.data.gameSetting.DuelExpLost);
    });
  }, []);

  const onStartGoldAmount = (num) => {
    setStartGoldAmount(parseFloat(num));
  };

  const onStartHP = (num) => {
    setStartHP(parseFloat(num));
  };

  const onMaxHP = (num) => {
    setMaxHP(parseFloat(num));
  };

  const onTurnTime = (num) => {
    setTurnTime(parseFloat(num));
  };

  const onGoldBonusForKill = (num) => {
    setGoldBonusForKill(parseFloat(num));
  };

  const onGoldBonusForRetire = (num) => {
    setGoldBonusForRetire(parseFloat(num));
  };

  const onElementalAttackBonusDamageOccurance = (num) => {
    setElementalAttackBonusDamageOccurrence(parseFloat(num));
  };

  const onElementalAttackBonusDamage = (num) => {
    setElementalAttackBonusDamage(parseFloat(num));
  };

  const onIncreaseDuelPointBy = (num) => {
    setIncreaseDuelPointBy(parseFloat(num));
  };

  const onIncreaseDuelExpBy = (num) => {
    setIncreaseDuelExpBy(parseFloat(num));
  };

  const onDecreaseDuelPointBy = (num) => {
    setDecreaseDuelPointBy(parseFloat(num));
  };

  const onDecreaseDuelExpBy = (num) => {
    setDecreaseDuelExpBy(parseFloat(num));
  };

  const onSetPlayerSetting = () => {
    let signData = localStorage.getItem("SignData");
    signData = JSON.parse(signData);

    axios
      .post(HOST_URL + "updatePlayerSetting", {
        StartGoldAmount: parseFloat(startGoldAmount),
        StartHP: parseFloat(startHP),
        MaxHP: parseFloat(maxHP),
        walletAddress: signData.address,
        signatureData: signData.message,
        signature: signData.signature,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Set the Player Settings!");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const onResetPlayerSetting = () => {
    let signData = localStorage.getItem("SignData");
    signData = JSON.parse(signData);

    axios
      .post(HOST_URL + "resetPlayerSetting", {
        walletAddress: signData.address,
        signatureData: signData.message,
        signature: signData.signature,
      })
      .then((res) => {
        if (res.status === 200) {
          setStartGoldAmount(parseFloat(res.data.StartGoldAmount));
          setStartHP(res.data.StartHP);
          setMaxHP(res.data.MaxHP);

          toast.success("Successfully Reset the Player Settings!");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const onSetGameSetting = () => {
    let signData = localStorage.getItem("SignData");
    signData = JSON.parse(signData);

    axios
      .post(HOST_URL + "updateGameSetting", {
        TurnTime: parseFloat(turnTime),
        GoldBonusForKill: parseFloat(goldBonusForKill),
        GoldBonusForRetire: parseFloat(goldBonusForRetire),
        ElementalBonusDamage: parseFloat(elementalAttackBonusDamage),
        ElementalBonusOccurancePercent: parseFloat(
          elementalAttackBonusDamageOccurrence
        ),
        DuelPointIncrease: parseFloat(increaseDuelPointBy),
        DuelPointDecrease: parseFloat(decreaseDuelPointBy),
        DuelExpWon: parseFloat(increaseDuelExpBy),
        DuelExpLost: parseFloat(decreaseDuelExpBy),
        walletAddress: signData.address,
        signatureData: signData.message,
        signature: signData.signature,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully Set the Game Settings!");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const onResetGameSetting = () => {
    let signData = localStorage.getItem("SignData");
    signData = JSON.parse(signData);

    axios
      .post(HOST_URL + "resetGameSetting", {
        walletAddress: signData.address,
        signatureData: signData.message,
        signature: signData.signature,
      })
      .then((res) => {
        if (res.status === 200) {
          setTurnTime(res.data.TurnTime);
          setGoldBonusForKill(res.data.GoldBonusForKill);
          setGoldBonusForRetire(res.data.GoldBonusForRetire);
          setElementalAttackBonusDamageOccurrence(
            res.data.ElementalBonusOccurancePercent
          );
          setElementalAttackBonusDamage(res.data.ElementalBonusDamage);
          setIncreaseDuelPointBy(res.data.DuelPointIncrease);
          setIncreaseDuelExpBy(res.data.DuelExpWon);
          setDecreaseDuelPointBy(res.data.DuelPointDecrease);
          setDecreaseDuelExpBy(res.data.DuelExpLost);

          toast.success("Successfully Reset the Game Settings!");
        }
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <section className="section-container">
        <div className="content-wrapper">
          <Row>
            <div className="col-md-12">
              <div className="card card-default">
                <div className="card-header">Game Configuration</div>
                <div className="card-body">
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="col-form-label text-align font-20">
                        Players Settings
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Start Gold Amount
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={startGoldAmount}
                          onChange={(e) => onStartGoldAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Start HP
                      </label>
                      <div className="col-md-3 ">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={startHP}
                          onChange={(e) => onStartHP(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Max HP
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={maxHP}
                          onChange={(e) => onMaxHP(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-3"></div>
                      <div className="col-xl-6">
                        <button
                          className="btn btn-oval btn-outline-info mgr-15"
                          type="button"
                          data-toggle="modal"
                          data-target="#setPlayerSetting"
                          onClick={() => onSetPlayerSetting()}
                        >
                          Apply
                        </button>
                        <button
                          className="btn btn-oval btn-outline-danger"
                          type="button"
                          onClick={() => onResetPlayerSetting()}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                  <form className="form-horizontal">
                    <div className="form-group">
                      <label className="col-form-label text-align font-20">
                        Game Settings
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Turn Times
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={turnTime}
                          onChange={(e) => onTurnTime(e.target.value)}
                        />
                      </div>
                      <label className="col-md-3 col-form-label text-left">
                        seconds
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Gold Bonus For Kill
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={goldBonusForKill}
                          onChange={(e) => onGoldBonusForKill(e.target.value)}
                        />
                      </div>
                      <label className="col-md-3 col-form-label text-left">
                        %
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Gold Bonus For Retire
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={goldBonusForRetire}
                          onChange={(e) => onGoldBonusForRetire(e.target.value)}
                        />
                      </div>
                      <label className="col-md-3 col-form-label text-left">
                        %
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        ElementalAttackBonusDamageOccurance
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={elementalAttackBonusDamageOccurrence}
                          onChange={(e) =>
                            onElementalAttackBonusDamageOccurance(
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <label className="col-md-3 col-form-label text-left">
                        %
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        ElementalAttackBounsDamage
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align"
                          type="text"
                          value={elementalAttackBonusDamage}
                          onChange={(e) =>
                            onElementalAttackBonusDamage(e.target.value)
                          }
                        />
                      </div>
                      <label className="col-md-3 col-form-label text-left">
                        %
                      </label>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Increase duel point by
                      </label>
                      <div className="col-md-3" style={{ paddingLeft: "10px" }}>
                        <input
                          className="form-control text-align increase-duel-input"
                          type="text"
                          value={increaseDuelPointBy}
                          onChange={(e) =>
                            onIncreaseDuelPointBy(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Increase duel exp by
                      </label>
                      <div className="col-md-3" style={{ paddingLeft: "10px" }}>
                        <input
                          className="form-control text-align increase-duel-input"
                          type="text"
                          value={increaseDuelExpBy}
                          onChange={(e) => onIncreaseDuelExpBy(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Decrease duel point by
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align decrease-duel-input"
                          type="text"
                          value={decreaseDuelPointBy}
                          onChange={(e) =>
                            onDecreaseDuelPointBy(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-3 col-form-label text-left">
                        Decrease duel exp by
                      </label>
                      <div className="col-md-3">
                        <input
                          className="form-control text-align decrease-duel-input"
                          type="text"
                          value={decreaseDuelExpBy}
                          onChange={(e) => onDecreaseDuelExpBy(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-3 col-form-label"></label>
                      <div className="col-xl-6">
                        <button
                          className="btn btn-oval btn-outline-info mgr-15"
                          type="button"
                          onClick={() => onSetGameSetting()}
                        >
                          Apply
                        </button>
                        <button
                          className="btn btn-oval btn-outline-danger"
                          type="button"
                          onClick={() => onResetGameSetting()}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Row>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            theme="colored"
            position="bottom-right"
          />
        </div>
      </section>
    </>
  );
}
