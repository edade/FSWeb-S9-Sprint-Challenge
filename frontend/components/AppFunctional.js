import axios from "axios";
import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [ message, setMessage ] = useState(initialMessage);
  const [ email, setEmail ] = useState(initialEmail);
  const [ steps, setSteps ] = useState(initialSteps);
  
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const coordinates = [
      "(1, 1)",
      "(2, 1)",
      "(3, 1)",
      "(1, 2)",
      "(2, 2)",
      "(3, 2)",
      "(1, 3)",
      "(2, 3)",
      "(3, 3)",
    ];
    return coordinates[index];
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    switch (yon.target.id) {
      case "up":
        if (index < 3) {
          setMessage("Yukarıya gidemezsiniz");
          break;
        }
        setIndex(index - 3);
        setMessage("");
        setSteps(steps + 1);

        break;
      case "right":
        if (index % 3 == 2) {
          setMessage("Sağa gidemezsiniz");
          break;
        }
        setIndex(index + 1);
        setMessage("");
        setSteps(steps + 1);
        break;
      case "down":
        if (index >= 6) {
          setMessage("Aşağıya gidemezsiniz");
          break;
        }
        setIndex(index + 3);
        setMessage("");
        setSteps(steps + 1);
        break;

      case "left":
        if (index % 3 == 0) {
          setMessage("Sola gidemezsiniz");
          break;
        }
        setIndex(index - 1);
        setMessage("");
        setSteps(steps + 1);
        break;
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    const payload = {
      x: getXY().slice(1, 2),
      y: getXY().slice(4, 5),
      steps: steps,
      email: email,
    };

    axios
      .post("http://localhost:9000/api/result", payload)
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setMessage(error.response.data.message);
      });


  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXY()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={sonrakiIndex} id="left">
          SOL
        </button>
        <button onClick={sonrakiIndex} id="up">
          YUKARI
        </button>
        <button onClick={sonrakiIndex} id="right">
          SAĞ
        </button>
        <button onClick={sonrakiIndex} id="down">
          AŞAĞI
        </button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={onChange} id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
