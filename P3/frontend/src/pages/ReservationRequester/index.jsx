import React, { useEffect, useState } from "react";

let token = localStorage.getItem("access");

function ReservationRequest() {
    const [property, setProperty] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numDays, setDays] = useState(null);
    const [price, setPrice] = useState(null);
    const [daysPrice, setDaysPrice] = useState(null);
    const [tax, setTaxes] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            const date1 = new Date(startDate);
            const date2 = new Date(endDate);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays);
            setDaysPrice(diffDays * price);
            setTaxes(daysPrice * 0.13);
            setTotalPrice(daysPrice + tax);
        }
    }, [startDate, endDate, price]);

    useEffect(() => {
        fetchProperty();
    }, []);

    async function fetchProperty() {
        try {
            const response = await fetch(
                "http://localhost:8000/properties/getproperty/11/"
            );
            console.log("API response: ", response);
            const data = await response.json();
            console.log("Data received: ", data);
            setProperty(data);
            setPrice(data.price_night);
        } catch (error) {
            console.error("Error fetching property:", error);
        }
    }
    return (
        <>
            <section className="section">
                <form>
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-two-fifths is-narrow-mobile">
                                <h2 className="title is-2">Request to Book</h2>

                                <div className="field">
                                    <label className="label">
                                        Your Trip Details
                                    </label>
                                </div>

                                <div className="field">
                                    <label className="label">Dates</label>
                                    <div className="columns is-variable is-1">
                                        <div
                                            className="control column is-one-quarter"
                                            style={{ marginRight: "1vw" }}
                                        >
                                            <label className="label has-text-weight-semibold">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                onChange={(event) =>
                                                    setStartDate(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="control column auto">
                                            <label className="label has-text-weight-semibold">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                onChange={(event) =>
                                                    setEndDate(
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="field pt-4">
                                    <label className="label">Guests</label>
                                    <div className="control">
                                        <div className="select">
                                            <select>
                                                <option>
                                                    Choose a number of guests
                                                </option>
                                                <option>1</option>
                                                <option selected>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                                <option>12</option>
                                                <option>13</option>
                                                <option>14</option>
                                                <option>15</option>
                                                <option>16</option>
                                                <option>17</option>
                                                <option>18</option>
                                                <option>19</option>
                                                <option>20</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field pt-4">
                                    <label className="label">Payment</label>
                                    <div className="control">
                                        <div className="select">
                                            <select>
                                                <option>
                                                    Credit or debit card
                                                </option>
                                                <option>Paypal</option>
                                                <option>Google Pay</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field pt-4">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Card Number"
                                            required
                                        ></input>
                                    </div>
                                    <div className="columns is-gapless">
                                        <div className="column is-one-half">
                                            <input
                                                className="input"
                                                type="month"
                                                min="2023-02"
                                                placeholder="Expiration Date"
                                                required
                                            ></input>
                                        </div>
                                        <div className="column auto">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="CVV"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Postal Code"
                                        required
                                    ></input>
                                </div>

                                <div className="control pt-3">
                                    <div className="select">
                                        <select>
                                            <option value="AFG">
                                                Afghanistan
                                            </option>
                                            <option value="ALA">
                                                Åland Islands
                                            </option>
                                            <option value="ALB">Albania</option>
                                            <option value="DZA">Algeria</option>
                                            <option value="ASM">
                                                American Samoa
                                            </option>
                                            <option value="AND">Andorra</option>
                                            <option value="AGO">Angola</option>
                                            <option value="AIA">
                                                Anguilla
                                            </option>
                                            <option value="ATA">
                                                Antarctica
                                            </option>
                                            <option value="ATG">
                                                Antigua and Barbuda
                                            </option>
                                            <option value="ARG">
                                                Argentina
                                            </option>
                                            <option value="ARM">Armenia</option>
                                            <option value="ABW">Aruba</option>
                                            <option value="AUS">
                                                Australia
                                            </option>
                                            <option value="AUT">Austria</option>
                                            <option value="AZE">
                                                Azerbaijan
                                            </option>
                                            <option value="BHS">Bahamas</option>
                                            <option value="BHR">Bahrain</option>
                                            <option value="BGD">
                                                Bangladesh
                                            </option>
                                            <option value="BRB">
                                                Barbados
                                            </option>
                                            <option value="BLR">Belarus</option>
                                            <option value="BEL">Belgium</option>
                                            <option value="BLZ">Belize</option>
                                            <option value="BEN">Benin</option>
                                            <option value="BMU">Bermuda</option>
                                            <option value="BTN">Bhutan</option>
                                            <option value="BOL">
                                                Bolivia, Plurinational State of
                                            </option>
                                            <option value="BES">
                                                Bonaire, Sint Eustatius and Saba
                                            </option>
                                            <option value="BIH">
                                                Bosnia and Herzegovina
                                            </option>
                                            <option value="BWA">
                                                Botswana
                                            </option>
                                            <option value="BVT">
                                                Bouvet Island
                                            </option>
                                            <option value="BRA">Brazil</option>
                                            <option value="IOT">
                                                British Indian Ocean Territory
                                            </option>
                                            <option value="BRN">
                                                Brunei Darussalam
                                            </option>
                                            <option value="BGR">
                                                Bulgaria
                                            </option>
                                            <option value="BFA">
                                                Burkina Faso
                                            </option>
                                            <option value="BDI">Burundi</option>
                                            <option value="KHM">
                                                Cambodia
                                            </option>
                                            <option value="CMR">
                                                Cameroon
                                            </option>
                                            <option value="CAN" selected>
                                                Canada
                                            </option>
                                            <option value="CPV">
                                                Cape Verde
                                            </option>
                                            <option value="CYM">
                                                Cayman Islands
                                            </option>
                                            <option value="CAF">
                                                Central African Republic
                                            </option>
                                            <option value="TCD">Chad</option>
                                            <option value="CHL">Chile</option>
                                            <option value="CHN">China</option>
                                            <option value="CXR">
                                                Christmas Island
                                            </option>
                                            <option value="CCK">
                                                Cocos (Keeling) Islands
                                            </option>
                                            <option value="COL">
                                                Colombia
                                            </option>
                                            <option value="COM">Comoros</option>
                                            <option value="COG">Congo</option>
                                            <option value="COD">
                                                Congo, the Democratic Republic
                                                of the
                                            </option>
                                            <option value="COK">
                                                Cook Islands
                                            </option>
                                            <option value="CRI">
                                                Costa Rica
                                            </option>
                                            <option value="CIV">
                                                Côte d'Ivoire
                                            </option>
                                            <option value="HRV">Croatia</option>
                                            <option value="CUB">Cuba</option>
                                            <option value="CUW">Curaçao</option>
                                            <option value="CYP">Cyprus</option>
                                            <option value="CZE">
                                                Czech Republic
                                            </option>
                                            <option value="DNK">Denmark</option>
                                            <option value="DJI">
                                                Djibouti
                                            </option>
                                            <option value="DMA">
                                                Dominica
                                            </option>
                                            <option value="DOM">
                                                Dominican Republic
                                            </option>
                                            <option value="ECU">Ecuador</option>
                                            <option value="EGY">Egypt</option>
                                            <option value="SLV">
                                                El Salvador
                                            </option>
                                            <option value="GNQ">
                                                Equatorial Guinea
                                            </option>
                                            <option value="ERI">Eritrea</option>
                                            <option value="EST">Estonia</option>
                                            <option value="ETH">
                                                Ethiopia
                                            </option>
                                            <option value="FLK">
                                                Falkland Islands (Malvinas)
                                            </option>
                                            <option value="FRO">
                                                Faroe Islands
                                            </option>
                                            <option value="FJI">Fiji</option>
                                            <option value="FIN">Finland</option>
                                            <option value="FRA">France</option>
                                            <option value="GUF">
                                                French Guiana
                                            </option>
                                            <option value="PYF">
                                                French Polynesia
                                            </option>
                                            <option value="ATF">
                                                French Southern Territories
                                            </option>
                                            <option value="GAB">Gabon</option>
                                            <option value="GMB">Gambia</option>
                                            <option value="GEO">Georgia</option>
                                            <option value="DEU">Germany</option>
                                            <option value="GHA">Ghana</option>
                                            <option value="GIB">
                                                Gibraltar
                                            </option>
                                            <option value="GRC">Greece</option>
                                            <option value="GRL">
                                                Greenland
                                            </option>
                                            <option value="GRD">Grenada</option>
                                            <option value="GLP">
                                                Guadeloupe
                                            </option>
                                            <option value="GUM">Guam</option>
                                            <option value="GTM">
                                                Guatemala
                                            </option>
                                            <option value="GGY">
                                                Guernsey
                                            </option>
                                            <option value="GIN">Guinea</option>
                                            <option value="GNB">
                                                Guinea-Bissau
                                            </option>
                                            <option value="GUY">Guyana</option>
                                            <option value="HTI">Haiti</option>
                                            <option value="HMD">
                                                Heard Island and McDonald
                                                Islands
                                            </option>
                                            <option value="VAT">
                                                Holy See (Vatican City State)
                                            </option>
                                            <option value="HND">
                                                Honduras
                                            </option>
                                            <option value="HKG">
                                                Hong Kong
                                            </option>
                                            <option value="HUN">Hungary</option>
                                            <option value="ISL">Iceland</option>
                                            <option value="IND">India</option>
                                            <option value="IDN">
                                                Indonesia
                                            </option>
                                            <option value="IRN">
                                                Iran, Islamic Republic of
                                            </option>
                                            <option value="IRQ">Iraq</option>
                                            <option value="IRL">Ireland</option>
                                            <option value="IMN">
                                                Isle of Man
                                            </option>
                                            <option value="ISR">Israel</option>
                                            <option value="ITA">Italy</option>
                                            <option value="JAM">Jamaica</option>
                                            <option value="JPN">Japan</option>
                                            <option value="JEY">Jersey</option>
                                            <option value="JOR">Jordan</option>
                                            <option value="KAZ">
                                                Kazakhstan
                                            </option>
                                            <option value="KEN">Kenya</option>
                                            <option value="KIR">
                                                Kiribati
                                            </option>
                                            <option value="PRK">
                                                Korea, Democratic People's
                                                Republic of
                                            </option>
                                            <option value="KOR">
                                                Korea, Republic of
                                            </option>
                                            <option value="KWT">Kuwait</option>
                                            <option value="KGZ">
                                                Kyrgyzstan
                                            </option>
                                            <option value="LAO">
                                                Lao People's Democratic Republic
                                            </option>
                                            <option value="LVA">Latvia</option>
                                            <option value="LBN">Lebanon</option>
                                            <option value="LSO">Lesotho</option>
                                            <option value="LBR">Liberia</option>
                                            <option value="LBY">Libya</option>
                                            <option value="LIE">
                                                Liechtenstein
                                            </option>
                                            <option value="LTU">
                                                Lithuania
                                            </option>
                                            <option value="LUX">
                                                Luxembourg
                                            </option>
                                            <option value="MAC">Macao</option>
                                            <option value="MKD">
                                                Macedonia, the former Yugoslav
                                                Republic of
                                            </option>
                                            <option value="MDG">
                                                Madagascar
                                            </option>
                                            <option value="MWI">Malawi</option>
                                            <option value="MYS">
                                                Malaysia
                                            </option>
                                            <option value="MDV">
                                                Maldives
                                            </option>
                                            <option value="MLI">Mali</option>
                                            <option value="MLT">Malta</option>
                                            <option value="MHL">
                                                Marshall Islands
                                            </option>
                                            <option value="MTQ">
                                                Martinique
                                            </option>
                                            <option value="MRT">
                                                Mauritania
                                            </option>
                                            <option value="MUS">
                                                Mauritius
                                            </option>
                                            <option value="MYT">Mayotte</option>
                                            <option value="MEX">Mexico</option>
                                            <option value="FSM">
                                                Micronesia, Federated States of
                                            </option>
                                            <option value="MDA">
                                                Moldova, Republic of
                                            </option>
                                            <option value="MCO">Monaco</option>
                                            <option value="MNG">
                                                Mongolia
                                            </option>
                                            <option value="MNE">
                                                Montenegro
                                            </option>
                                            <option value="MSR">
                                                Montserrat
                                            </option>
                                            <option value="MAR">Morocco</option>
                                            <option value="MOZ">
                                                Mozambique
                                            </option>
                                            <option value="MMR">Myanmar</option>
                                            <option value="NAM">Namibia</option>
                                            <option value="NRU">Nauru</option>
                                            <option value="NPL">Nepal</option>
                                            <option value="NLD">
                                                Netherlands
                                            </option>
                                            <option value="NCL">
                                                New Caledonia
                                            </option>
                                            <option value="NZL">
                                                New Zealand
                                            </option>
                                            <option value="NIC">
                                                Nicaragua
                                            </option>
                                            <option value="NER">Niger</option>
                                            <option value="NGA">Nigeria</option>
                                            <option value="NIU">Niue</option>
                                            <option value="NFK">
                                                Norfolk Island
                                            </option>
                                            <option value="MNP">
                                                Northern Mariana Islands
                                            </option>
                                            <option value="NOR">Norway</option>
                                            <option value="OMN">Oman</option>
                                            <option value="PAK">
                                                Pakistan
                                            </option>
                                            <option value="PLW">Palau</option>
                                            <option value="PSE">
                                                Palestinian Territory, Occupied
                                            </option>
                                            <option value="PAN">Panama</option>
                                            <option value="PNG">
                                                Papua New Guinea
                                            </option>
                                            <option value="PRY">
                                                Paraguay
                                            </option>
                                            <option value="PER">Peru</option>
                                            <option value="PHL">
                                                Philippines
                                            </option>
                                            <option value="PCN">
                                                Pitcairn
                                            </option>
                                            <option value="POL">Poland</option>
                                            <option value="PRT">
                                                Portugal
                                            </option>
                                            <option value="PRI">
                                                Puerto Rico
                                            </option>
                                            <option value="QAT">Qatar</option>
                                            <option value="REU">Réunion</option>
                                            <option value="ROU">Romania</option>
                                            <option value="RUS">
                                                Russian Federation
                                            </option>
                                            <option value="RWA">Rwanda</option>
                                            <option value="BLM">
                                                Saint Barthélemy
                                            </option>
                                            <option value="SHN">
                                                Saint Helena, Ascension and
                                                Tristan da Cunha
                                            </option>
                                            <option value="KNA">
                                                Saint Kitts and Nevis
                                            </option>
                                            <option value="LCA">
                                                Saint Lucia
                                            </option>
                                            <option value="MAF">
                                                Saint Martin (French part)
                                            </option>
                                            <option value="SPM">
                                                Saint Pierre and Miquelon
                                            </option>
                                            <option value="VCT">
                                                Saint Vincent and the Grenadines
                                            </option>
                                            <option value="WSM">Samoa</option>
                                            <option value="SMR">
                                                San Marino
                                            </option>
                                            <option value="STP">
                                                Sao Tome and Principe
                                            </option>
                                            <option value="SAU">
                                                Saudi Arabia
                                            </option>
                                            <option value="SEN">Senegal</option>
                                            <option value="SRB">Serbia</option>
                                            <option value="SYC">
                                                Seychelles
                                            </option>
                                            <option value="SLE">
                                                Sierra Leone
                                            </option>
                                            <option value="SGP">
                                                Singapore
                                            </option>
                                            <option value="SXM">
                                                Sint Maarten (Dutch part)
                                            </option>
                                            <option value="SVK">
                                                Slovakia
                                            </option>
                                            <option value="SVN">
                                                Slovenia
                                            </option>
                                            <option value="SLB">
                                                Solomon Islands
                                            </option>
                                            <option value="SOM">Somalia</option>
                                            <option value="ZAF">
                                                South Africa
                                            </option>
                                            <option value="SGS">
                                                South Georgia and the South
                                                Sandwich Islands
                                            </option>
                                            <option value="SSD">
                                                South Sudan
                                            </option>
                                            <option value="ESP">Spain</option>
                                            <option value="LKA">
                                                Sri Lanka
                                            </option>
                                            <option value="SDN">Sudan</option>
                                            <option value="SUR">
                                                Suriname
                                            </option>
                                            <option value="SJM">
                                                Svalbard and Jan Mayen
                                            </option>
                                            <option value="SWZ">
                                                Swaziland
                                            </option>
                                            <option value="SWE">Sweden</option>
                                            <option value="CHE">
                                                Switzerland
                                            </option>
                                            <option value="SYR">
                                                Syrian Arab Republic
                                            </option>
                                            <option value="TWN">
                                                Taiwan, Province of China
                                            </option>
                                            <option value="TJK">
                                                Tajikistan
                                            </option>
                                            <option value="TZA">
                                                Tanzania, United Republic of
                                            </option>
                                            <option value="THA">
                                                Thailand
                                            </option>
                                            <option value="TLS">
                                                Timor-Leste
                                            </option>
                                            <option value="TGO">Togo</option>
                                            <option value="TKL">Tokelau</option>
                                            <option value="TON">Tonga</option>
                                            <option value="TTO">
                                                Trinidad and Tobago
                                            </option>
                                            <option value="TUN">Tunisia</option>
                                            <option value="TUR">Turkey</option>
                                            <option value="TKM">
                                                Turkmenistan
                                            </option>
                                            <option value="TCA">
                                                Turks and Caicos Islands
                                            </option>
                                            <option value="TUV">Tuvalu</option>
                                            <option value="UGA">Uganda</option>
                                            <option value="UKR">Ukraine</option>
                                            <option value="ARE">
                                                United Arab Emirates
                                            </option>
                                            <option value="GBR">
                                                United Kingdom
                                            </option>
                                            <option value="USA">
                                                United States
                                            </option>
                                            <option value="UMI">
                                                United States Minor Outlying
                                                Islands
                                            </option>
                                            <option value="URY">Uruguay</option>
                                            <option value="UZB">
                                                Uzbekistan
                                            </option>
                                            <option value="VUT">Vanuatu</option>
                                            <option value="VEN">
                                                Venezuela, Bolivarian Republic
                                                of
                                            </option>
                                            <option value="VNM">
                                                Viet Nam
                                            </option>
                                            <option value="VGB">
                                                Virgin Islands, British
                                            </option>
                                            <option value="VIR">
                                                Virgin Islands, U.S.
                                            </option>
                                            <option value="WLF">
                                                Wallis and Futuna
                                            </option>
                                            <option value="ESH">
                                                Western Sahara
                                            </option>
                                            <option value="YEM">Yemen</option>
                                            <option value="ZMB">Zambia</option>
                                            <option value="ZWE">
                                                Zimbabwe
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="field pt-5">
                                    <label className="label">
                                        Required for your trip
                                    </label>
                                </div>

                                <div className="field">
                                    <label className="label has-text-weight-semibold">
                                        Message the Host
                                    </label>
                                    <div className="control">
                                        <textarea
                                            className="textarea"
                                            type="text"
                                            placeholder="Let the host know why you're travelling and when you'll check in"
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="field pt-4">
                                    <label className="label">
                                        Cancellation Policy
                                    </label>
                                    <p>This reservation is non-refundable.</p>
                                </div>

                                <div className="field pt-4">
                                    <label className="label">
                                        Ground rules
                                    </label>
                                    <p>
                                        We ask every guest to remember a few
                                        simple things about what makes a great
                                        guest:
                                    </p>
                                    <p>- Follow the house rules</p>
                                    <p>
                                        - Treat your Host’s home like your own
                                    </p>
                                </div>

                                <div className="field pt-4">
                                    <b>
                                        Your reservation won’t be confirmed
                                        until the host accepts your request
                                        (within 24 hours). You won’t be charged
                                        until then.
                                    </b>
                                </div>

                                <div className="field pt-4">
                                    <div className="control">
                                        <label className="checkbox">
                                            <input
                                                type="checkbox"
                                                required
                                            ></input>
                                            I agree to the{" "}
                                            <a href="">terms and conditions</a>.
                                        </label>
                                    </div>
                                </div>

                                <div className="field is-grouped">
                                    <div className="control">
                                        <button
                                            className="button is-link"
                                            onClick={() => {
                                                fetch(
                                                    "http://localhost:8000/properties/createreservation/",
                                                    {
                                                        headers: {
                                                            Authorization: `Bearer ${token}`,
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        method: "POST",
                                                        body: JSON.stringify({
                                                            property: 11,
                                                            start_date:
                                                                startDate,
                                                            end_date: endDate,
                                                        }),
                                                    }
                                                );
                                            }}
                                        >
                                            Request to Book
                                        </button>
                                    </div>
                                    <div className="control">
                                        <a
                                            className="button is-link is-light"
                                            href="propertydetailsrequester.html"
                                        >
                                            Cancel
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="column is-two-fifths">
                                <div className="tile booking-img is-parent">
                                    <div className="tile is-child box itembox">
                                        <a
                                            href="propertydetailsrequester.html"
                                            className="tilelink"
                                        >
                                            <figure className="image is-4by3">
                                                <img
                                                    src={property?.images[0]}
                                                    alt="House image"
                                                />
                                            </figure>
                                            <div>
                                                <b>{property?.property_name}</b>
                                                <br></br>
                                                <b>Price Details</b>
                                                <br></br>
                                                <p>
                                                    ${price} CAD x {numDays}{" "}
                                                    nights
                                                    <span className="right">
                                                        ${daysPrice} CAD
                                                    </span>
                                                </p>
                                                <p>
                                                    Taxes
                                                    <span className="right">
                                                        ${tax} CAD
                                                    </span>
                                                </p>
                                                <br></br>

                                                <b>
                                                    Total Cost (CAD)
                                                    <span className="right">
                                                        ${totalPrice}
                                                    </span>
                                                </b>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}

export default ReservationRequest;
