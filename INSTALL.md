####Προετοιμασία περιβάλλοντος ανάπτυξης 
Θεωρούμε ότι τα **phonegap - android - bower - gulp** κλπ είναι ήδη εγκατεστημένα και στις τελευταίες εκδόσεις τους.

κατεβάζουμε από το repository το project

και κάνουμε install τα απαραίτητα plugins

    phonegap plugin add org.apache.cordova.geolocation
    phonegap plugin add org.apache.cordova.device
    phonegap plugin add org.apache.cordova.camera
    phonegap plugin add https://github.com/sl45sms/DeviceInformationPlugin.git

*(αν δεν δουλέψει κατεβάζουμε το zip και εγκαθιστούμε τοπικά phonegap plugin add ../DeviceInformationPlugin)*

    phonegap plugin rm org.apache.cordova.network-information (σε περίπτωση που υπάρχει το παλιό)
    phonegap plugin add cordova-plugin-network-information

κατόπιν τρέχουμε  `bower install` 

και μετά *(αφού ρυθμίσουμε το gulp σύμφωνα με τις ανάγκες μας)*

    gulp build

τέλος αν όλα είναι καλά τρέχουμε 
`phonegap run android`  *(σε περίπτωση προβλήματος  phonegap -d run android)*
