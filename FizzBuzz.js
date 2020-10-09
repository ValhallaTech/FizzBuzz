<script>
	//Click event
	document.getElementById("btnFizzBuzz").addEventListener("click", function(){
		
	}
	
	//Step 1: User Data
	let fizz = parseInt(document.getElementById("txtFizzBuzzIn1")).value;
	let buzz = parseInt(document.getElementById("txtFizzBuzzIn2")).value;
	
	//Step 2: Run user data
	let output = DoFizzBuzzFoundation(fizz, buzz);

	//Step 3: Output the results
	document.getElementById("pFizzBuzzOut").innerHTML = output;


	function DoFizzBuzzFoundation(fizz,buzz){
		let output = "";
		for(let loop = 1; loop <= 100; loop++){
			let fizzRemainder = loop % fizz;
			let buzzRemainder = loop % buzz;
			output += `loop value:${loop} <br /> FR: ${loop} % ${fizz} = ${fizzRemainder} <br /> BR: ${loop} % ${buzz} <br /><br />'
		}
		return output;
	}
</script>