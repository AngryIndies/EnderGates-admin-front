import React from "react";
import { Row } from "react-bootstrap";

const GameConfigureIndex = () => {
    return (
        <section className="section-container">
            <div className="content-wrapper">
                <Row>
                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header">Game Configuration</div>
                            <div class="card-body">
                                <form class="form-horizontal">
                                    <div class="form-group row">
                                        <label class="col-xl-2 col-form-label text-align font-20">Players Settings</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-2 col-form-label text-left">Start Gold Amount</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="email" placeholder="100" />
                                        </div>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-2 col-form-label text-left">Start HP</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="1000" />
                                        </div>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-2 col-form-label text-left">Max HP</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="1000" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-xl-1 col-form-label"></label>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-xl-2 col-form-label"></label>
                                        <div class="col-xl-6">
                                            <button class="btn btn-oval btn-outline-info mgr-15" type="button">Apply</button>
                                            <button class="btn btn-oval btn-outline-danger" type="button">Reset</button>
                                        </div>
                                    </div>
                                </form>
                                <form class="form-horizontal mt-5">
                                    <div class="form-group row">
                                        <label class="col-xl-2 col-form-label text-align font-20">Game Settings</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-3 col-form-label text-left">Turn Times</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="email" placeholder="120" />
                                        </div>
                                        <label class="col-xl-3 col-form-label text-left">seconds</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-3 col-form-label text-left">Gold Bonus For Kill</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="120" />
                                        </div>
                                        <label class="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-3 col-form-label text-left">Gold Bonus For Retire</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="120" />
                                        </div>
                                        <label class="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-3 col-form-label text-left">ElementalAttackBonusDamageOccurance</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="120" />
                                        </div>
                                        <label class="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div class="form-group row pl_10">
                                        <label class="col-xl-3 col-form-label text-left">ElementalAttackBounsDamage</label>
                                        <div class="col-xl-1">
                                            <input class="form-control text-align" type="password" placeholder="120" />
                                        </div>
                                        <label class="col-xl-3 col-form-label text-left">%</label>
                                    </div>
                                    <div class="col-xl-12 form-group row">
                                        <div class="col-xl-6">
                                            <div class="form-group row pl_19">
                                                <label class="col-xl-7 col-form-label text-left">Increase duel point by</label>
                                                <div class="col-xl-2" style={{'paddingLeft' : '10px'}}>
                                                    <input class="form-control text-align increase-duel-input" type="password" placeholder="120" />
                                                </div>
                                            </div>
                                            <div class="form-group row pl_19">
                                                <label class="col-xl-7 col-form-label text-left">Increase duel exp by</label>
                                                <div class="col-xl-2" style={{'paddingLeft' : '10px'}}>
                                                    <input class="form-control text-align increase-duel-input" type="password" placeholder="120" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-6">
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-form-label text-left">Decrease duel point by</label>
                                                <div class="col-xl-2">
                                                    <input class="form-control text-align decrease-duel-input" type="password" placeholder="120" />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label class="col-xl-3 col-form-label text-left">Decrease duel exp by</label>
                                                <div class="col-xl-2">
                                                    <input class="form-control text-align decrease-duel-input" type="password" placeholder="120" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label class="col-xl-2 col-form-label"></label>
                                        <div class="col-xl-6">
                                            <button class="btn btn-oval btn-outline-info mgr-15" type="button">Apply</button>
                                            <button class="btn btn-oval btn-outline-danger" type="button">Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </Row>
            </div>
        </section>
    );
}

export default GameConfigureIndex;