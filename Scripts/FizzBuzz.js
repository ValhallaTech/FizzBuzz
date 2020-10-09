	//Click event
	document.getElementById("btnFizzBuzz").addEventListener("click", function() {


        //Step 1: User Data
        const fizz = parseInt(document.getElementById("txtFizzBuzzIn1")).value;
        const buzz = parseInt(document.getElementById("txtFizzBuzzIn2")).value;

        //Step 2: Run user data
        const output = doFizzBuzzFoundation(fizz, buzz);

        //Step 3: Output the results
        document.getElementById("pFizzBuzzOut").innerHTML = output;


        function doFizzBuzzFoundation(fizz, buzz) {
            let output = "";
            for (let loop = 1; loop <= 100; loop++) {
                const fizzRemainder = loop % fizz;
                const buzzRemainder = loop % buzz;
                output += `loop value:${loop} <br /> FR: ${loop} % ${fizz} = ${fizzRemainder} <br /> BR: ${loop} % ${buzz = buzzRemainder} <br /><br />`;
            }
            return output;
        }
    });