function calculateBanknoteCounts(sum) { 
    return function (checkSum){ 
        let checkSumStr = String(checkSum); 
        if (typeof(checkSum) != "number") { 
            return "Alas, a type error has occurred! But fret not, for we..."; 
        } else if (checkSum < 10 || checkSum > 1000000) { 
            return "Unfortunately, the withdrawal amount you entered is outside the valid range of 1000 to 1 million."; 
        } else if (checkSumStr.substring(checkSumStr.length - 1) != "0") { 
            return "Error: Please enter the amount without cents."; 
        } else { 
            return checkAmount(checkSum); 
        } 
    }(sum); 
   
    function checkAmount(callback) {
        let milionMnacord = callback % 100000;
        let haryurhazar = callback-milionMnacord;
        let haryurhazarMnacord = milionMnacord % 20000;
        let qsanhazar = milionMnacord - haryurhazarMnacord;
        let qsanhazarMnacord = haryurhazarMnacord % 10000;
        let tashazar = haryurhazarMnacord - qsanhazarMnacord; 
        let tashazarMnacord = qsanhazarMnacord % 5000;
        let hinghazar = qsanhazarMnacord - tashazarMnacord;
        let hazarmnacord = tashazarMnacord % 1000;
        let hazar = tashazarMnacord - hazarmnacord;
        let hingharyurmnacord = hazarmnacord % 500;
        let hingharyur = hazarmnacord - hingharyurmnacord;
        let erkuharyurmnacord = hingharyurmnacord % 200;
        let erkuaharyur = hingharyurmnacord - erkuharyurmnacord;
        let haryurmnacord = erkuharyurmnacord % 100;
        let haryur = erkuharyurmnacord - haryurmnacord;
        let hisunmnacord = haryurmnacord % 50;
        let hisun = haryurmnacord - hisunmnacord;
        let qsanmnacord =  hisunmnacord % 20;
        let qsan = hisunmnacord - qsanmnacord;
        let tasmnacord = qsanmnacord % 10;
        let tas = qsanmnacord - tasmnacord;
        console.log(hingharyurmnacord);
        if(haryurhazar!=0) 
            console.log(haryurhazar/100000 + "hat 100000 dram"); 
        if(qsanhazar!=0) 
            console.log(qsanhazar/20000 + "hat 20000 dram",); 
        if(tashazar!=0) 
            console.log(tashazar/10000 + "hat 10000 dram",); 
        if(hinghazar!=0) 
            console.log(hinghazar/5000 + "hat 5000 dram",); 
        if(hazar!=0) 
            console.log(hazar/1000 + "hat 1000 dram"); 
        if (hingharyur!=0)
            console.log(hingharyur/500 + "hat 500 dram"); 
        if (erkuaharyur!=0)
            console.log(erkuaharyur/200 + "hat 200 dram");
        if (haryur!=0)
            console.log(haryur/100 + "hat 100 dram"); 
        if (hisun!=0)
            console.log(hisun/50 + "hat 50 dram"); 
        if (qsan!=0)
            console.log(qsan/20 + "hat 20 dram"); 
        if (tas!=0)
            console.log(tas/10 + "hat 10 dram"); 
    }
}
console.log(calculateBanknoteCounts(296880));