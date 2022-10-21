import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMetaMask } from "metamask-react";
import { Row } from "react-bootstrap";
import axios from "axios";
import {ethers} from "ethers";

import { HOST_URL } from "../../actions/types";
import SignModal from "./sign_modal";


const GameConfigureIndex = () => {

    const { status, connect, account, chainId, ethereum } = useMetaMask();

    const [startGoldAmount, setStartGoldAmount] = useState(0);
    const [startHP, setStartHP] = useState(0);
    const [maxHP, setMaxHP] = useState(0);
    const [turnTime, setTurnTime] = useState(0);
    const [goldBonusForKill, setGoldBonusForKill] = useState(0);
    const [goldBonusForRetire, setGoldBonusForRetire] = useState(0);
    const [elementalAttackBonusDamageOccurance, setElementalAttackBonusDamageOccurance] = useState(0);
    const [elementalAttackBonusDamage, setElementalAttackBonusDamage] = useState(0);
    const [increaseDuelPointBy, setIncreaseDuelPointBy] = useState(0);
    const [increaseDuelExpBy, setIncreaseDuelExpBy] = useState(0);
    const [decreaseDuelPointBy, setDecreaseDuelPointBy] = useState(0);
    const [decreaseDuelExpBy, setDecreaseDuelExpBy] = useState(0);

    useEffect(() => {
        axios.get(HOST_URL + 'getGameSetting').then(res => {
            setStartGoldAmount(parseFloat(res.data.playerSetting.StartGoldAmount));
            setStartHP(res.data.playerSetting.StartHP);
            setMaxHP(res.data.playerSetting.MaxHP);
            setTurnTime(res.data.gameSetting.TurnTime);
            setGoldBonusForKill(res.data.gameSetting.GoldBonusForKill);
            setGoldBonusForRetire(res.data.gameSetting.GoldBonusForRetire);
            setElementalAttackBonusDamageOccurance(res.data.gameSetting.ElementalBonusOccurancePercent);
            setElementalAttackBonusDamage(res.data.gameSetting.ElementalBonusDamage);
            setIncreaseDuelPointBy(res.data.gameSetting.DuelPointIncrease);
            setIncreaseDuelExpBy(res.data.gameSetting.DuelExpWon);
            setDecreaseDuelPointBy(res.data.gameSetting.DuelPointDecrease);
            setDecreaseDuelExpBy(res.data.gameSetting.DuelExpLost);
        });
    }, []);

    const onStartGoldAmount = (num) => {
        setStartGoldAmount(parseFloat(num));
    }

    const onStartHP = (num) => {
        setStartHP(parseFloat(num));
    }

    const onMaxHP = (num) => {
        setMaxHP(parseFloat(num));
    }

    const onTurnTime = (num) => {
        setTurnTime(parseFloat(num));
    }

    const onGoldBonusForKill = (num) => {
        setGoldBonusForKill(parseFloat(num));
    }

    const onGoldBonusForRetire = (num) => {
        setGoldBonusForRetire(parseFloat(num));
    }

    const onElementalAttackBonusDamageOccurance = (num) => {
        setElementalAttackBonusDamageOccurance(parseFloat(num));
    }

    const onElementalAttackBonusDamage = (num) => {
        setElementalAttackBonusDamage(parseFloat(num));
    }

    const onIncreaseDuelPointBy = (num) => {
        setIncreaseDuelPointBy(parseFloat(num));
    }

    const onIncreaseDuelExpBy = (num) => {
        setIncreaseDuelExpBy(parseFloat(num));
    }

    const onDecreaseDuelPointBy = (num) => {
        setDecreaseDuelPointBy(parseFloat(num));
    }

    const onDecreaseDuelExpBy = (num) => {
        setDecreaseDuelExpBy(parseFloat(num));
    }

    const onSetPlayerSetting = () => {
        if(status === 'notConnected'){
            connect();
        } else if(status === 'connected'){
            alert(account);

            // console.log(startGoldAmount, startHP, maxHP);
            // axios.put(HOST_URL + 'updatePlayerSetting', {
            //     StartGoldAmount: parseFloat(startGoldAmount),
            //     StartHP: parseFloat(startHP),
            //     MaxHP: parseFloat(maxHP),
            //     address : account
            // }).then(res => {
            //     console.log(res.status);
            //     if(res.status == 200){
            //         toast.success("Successfully Set the Player Settings!");
            //     } else {
            //         toast.error("There is issues in your action!");
            //     }
            // });
        }
    }

    const onResetPlayerSetting = () => {
        axios.put(HOST_URL + 'resetPlayerSetting').then(res => {
            setStartGoldAmount(parseFloat(res.data.StartGoldAmount));
            setStartHP(res.data.StartHP);
            setMaxHP(res.data.MaxHP);

            if (res.status == 200) {
                toast.success("Successfully Reset the Player Settings!");
            } else {
                toast.error("There is issues in your action!");
            }
        })
    }

    const onSetGameSetting = () => {
        axios.put(HOST_URL + 'updateGameSetting', {
            TurnTime: parseFloat(turnTime),
            GoldBonusForKill: parseFloat(goldBonusForKill),
            GoldBonusForRetire: parseFloat(goldBonusForRetire),
            ElementalBonusDamage: parseFloat(elementalAttackBonusDamage),
            ElementalBonusOccurancePercent: parseFloat(elementalAttackBonusDamageOccurance),
            DuelPointIncrease: parseFloat(increaseDuelPointBy),
            DuelPointDecrease: parseFloat(decreaseDuelPointBy),
            DuelExpWon: parseFloat(increaseDuelExpBy),
            DuelExpLost: parseFloat(decreaseDuelExpBy),
        }).then(res => {
            if (res.status == 200) {
                toast.success("Successfully Set the Game Settings!");
            } else {
                toast.error("There is any issues in your action!");
            }
        });
    }

    const onResetGameSetting = () => {
        axios.put(HOST_URL + 'resetGameSetting').then(res => {
            setTurnTime(res.data.TurnTime);
            setGoldBonusForKill(res.data.GoldBonusForKill);
            setGoldBonusForRetire(res.data.GoldBonusForRetire);
            setElementalAttackBonusDamageOccurance(res.data.ElementalBonusOccurancePercent);
            setElementalAttackBonusDamage(res.data.ElementalBonusDamage);
            setIncreaseDuelPointBy(res.data.DuelPointIncrease);
            setIncreaseDuelExpBy(res.data.DuelExpWon);
            setDecreaseDuelPointBy(res.data.DuelPointDecrease);
            setDecreaseDuelExpBy(res.data.DuelExpLost);

            if (res.status == 200) {
                toast.success("Successfully Reset the Game Settings!");
            } else {
                toast.error("There is any issues in your action!");
            }
        })

    }


    return (
        <section className="section-container">
            <div className="content-wrapper">
                <Row>
                    <div className="col-md-12">
                        <div className="card card-default">
                            <div className="card-header">Game Configuration</div>
                            <div className="card-body">
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label className="col-xl-2 col-form-label text-align font-20">Players Settings</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-2 col-form-label text-left">Start Gold Amount</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={startGoldAmount}
                                                onChange={(e) => onStartGoldAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-2 col-form-label text-left">Start HP</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={startHP}
                                                onChange={(e) => onStartHP(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-2 col-form-label text-left">Max HP</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={maxHP}
                                                onChange={(e) => onMaxHP(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-1 col-form-label"></label>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-2 col-form-label"></label>
                                        <div className="col-xl-6">
                                            <button
                                                className="btn btn-oval btn-outline-info mgr-15"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#setPlayerSetting"
                                                // onClick={() => onSetPlayerSetting()}
                                            >Apply</button>
                                            <button
                                                className="btn btn-oval btn-outline-danger"
                                                type="button"
                                                onClick={() => onResetPlayerSetting()}
                                            >Reset</button>
                                        </div>
                                    </div>
                                </form>
                                <form className="form-horizontal mt-5">
                                    <div className="form-group row">
                                        <label className="col-xl-2 col-form-label text-align font-20">Game Settings</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-3 col-form-label text-left">Turn Times</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={turnTime}
                                                onChange={(e) => onTurnTime(e.target.value)}
                                            />
                                        </div>
                                        <label className="col-xl-3 col-form-label text-left">seconds</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-3 col-form-label text-left">Gold Bonus For Kill</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={goldBonusForKill}
                                                onChange={(e) => onGoldBonusForKill(e.target.value)}
                                            />
                                        </div>
                                        <label className="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-3 col-form-label text-left">Gold Bonus For Retire</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={goldBonusForRetire}
                                                onChange={(e) => onGoldBonusForRetire(e.target.value)}
                                            />
                                        </div>
                                        <label className="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-3 col-form-label text-left">ElementalAttackBonusDamageOccurance</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={elementalAttackBonusDamageOccurance}
                                                onChange={(e) => onElementalAttackBonusDamageOccurance(e.target.value)}
                                            />
                                        </div>
                                        <label className="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div className="form-group row pl_10">
                                        <label className="col-xl-3 col-form-label text-left">ElementalAttackBounsDamage</label>
                                        <div className="col-xl-1">
                                            <input
                                                className="form-control text-align"
                                                type="number"
                                                value={elementalAttackBonusDamage}
                                                onChange={(e) => onElementalAttackBonusDamage(e.target.value)}
                                            />
                                        </div>
                                        <label className="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div className="col-xl-12 form-group row">
                                        <div className="col-xl-6">
                                            <div className="form-group row pl_19">
                                                <label className="col-xl-7 col-form-label text-left">Increase duel point by</label>
                                                <div className="col-xl-2" style={{ 'paddingLeft': '10px' }}>
                                                    <input
                                                        className="form-control text-align increase-duel-input"
                                                        type="number"
                                                        value={increaseDuelPointBy}
                                                        onChange={(e) => onIncreaseDuelPointBy(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row pl_19">
                                                <label className="col-xl-7 col-form-label text-left">Increase duel exp by</label>
                                                <div className="col-xl-2" style={{ 'paddingLeft': '10px' }}>
                                                    <input
                                                        className="form-control text-align increase-duel-input"
                                                        type="number"
                                                        value={increaseDuelExpBy}
                                                        onChange={(e) => onIncreaseDuelExpBy(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-form-label text-left">Decrease duel point by</label>
                                                <div className="col-xl-2">
                                                    <input
                                                        className="form-control text-align decrease-duel-input"
                                                        type="number"
                                                        value={decreaseDuelPointBy}
                                                        onChange={(e) => onDecreaseDuelPointBy(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-xl-3 col-form-label text-left">Decrease duel exp by</label>
                                                <div className="col-xl-2">
                                                    <input
                                                        className="form-control text-align decrease-duel-input"
                                                        type="number"
                                                        value={decreaseDuelExpBy}
                                                        onChange={(e) => onDecreaseDuelExpBy(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-xl-2 col-form-label"></label>
                                        <div className="col-xl-6">
                                            <button
                                                className="btn btn-oval btn-outline-info mgr-15"
                                                type="button"
                                                onClick={() => onSetGameSetting()}
                                            >Apply</button>
                                            <button
                                                className="btn btn-oval btn-outline-danger"
                                                type="button"
                                                onClick={() => onResetGameSetting()}
                                            >Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <SignModal/>
                </Row>
                <ToastContainer
                    autoClose={3000}
                    hideProgressBar={true}
                    theme="colored"
                    position="bottom-right"
                />                
            </div>
        </section>
    );
}

export default GameConfigureIndex;