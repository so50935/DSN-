function api_call() {
  document.querySelector("#tbl").innerHTML = "";
  document.querySelector(".loader").style.display = "block";
  fetch("http://localhost:3001/")
    .then((res) => res.json())
    .then((rows) => {
      const recordsByDsn = {};
      for (const row of rows) {
        const dsn = row.dsn;

        if (!recordsByDsn[dsn]) {
          recordsByDsn[dsn] = row;
          continue;
        }

        const latestTsSoFar = new Date(recordsByDsn[dsn].timestamp);
        const newTs = new Date(row.timestamp);

        if (newTs > latestTsSoFar) {
          recordsByDsn[dsn] = row;
        }
      }
      // console.log(recordsByDsn);

      for (const obj of Object.values(recordsByDsn)) {
        const dsnStr = obj.dsn.padEnd(15, " ");
        const batteryStr = (obj.battery.toFixed(0) + "%").padEnd(15, " ");
        const timeStr = obj.timestamp;

        const trElement = document.createElement("ul");
        trElement.innerHTML =
          `
         <li>` +
          dsnStr +
          `</li>
        <li>` +
          batteryStr +
          `</li>
        <li>` +
          timeStr +
          `</li>`;

        document.querySelector("#tbl").appendChild(trElement);
        document.querySelector(".loader").style.display = "none";
        // console.log(dsnStr, batteryStr, timeStr);
      }
    });
}

window.onload = function () {
  const element = document.getElementById("BTNAPI");
  element.addEventListener("click", api_call);
};
