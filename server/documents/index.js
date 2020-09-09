module.exports = ({ themeName, studentName, studentNumber }) => {
  const today = new Date();
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Prijava završnog rada</title>
          <style>
             .pattern-div {
             max-width: 800px;
             margin: auto;
             display: flex;
             flex-direction: column;
             justify-content: center;
             align-items: center;
             text-align: center;
             }
            
             }
          </style>
         
       </head>
       <body>
          <div class="pattern-div">
          <img src="https://www.w3schools.com/images/w3schools_green.jpg"
                               style="width:100%; max-width:156px;">
          <p><span><strong>Prijava teme završnog rada</strong></span></p>
          <p>Datum:  <strong>${`${today.getDate()}. ${
            today.getMonth() + 1
          }. ${today.getFullYear()}.`}</strong></p>
          <p>Prijedlog naslova teme: <strong>${themeName}</strong></p>
          <p>Student/ica: <strong>${studentName}</strong></p>
          <p>Matični broj studenta: <strong>${studentNumber}</strong></p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley
            of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of
            Lorem Ipsum.
          </p>
            
          </div>
       </body>
    </html>
    `;
};
