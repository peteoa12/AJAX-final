<?php 
        // create curl resource 
        $ch = curl_init(); 

        $get_string = "";
        foreach ($_GET as $key => $value) {
                $get_string .= $key . "=" . $value . "&";
        }

        $url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAJIuB_alMCl6rzsAECbksgBloPbxTW2xs&'.$get_string;

        // echo $url;
        // die;

        // set url 
        curl_setopt($ch, CURLOPT_URL, $url); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);   

        echo $output;   
?>