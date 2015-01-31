<?php

include './lib/Braintree.php';

Braintree_Configuration::environment('sandbox');
Braintree_Configuration::merchantId('4p8zhj8k4yps69n5');
Braintree_Configuration::publicKey('jmymcgwd9nn7gjff');
Braintree_Configuration::privateKey('40382b23c62db5b5bd0c6f42afe7fe20');


$clientToken = Braintree_ClientToken::generate(array(
    "customerId" => $aCustomerId
));


$nonce = $_POST["payment_method_nonce"];


$result = Braintree_Transaction::sale(array(
  'amount' => $_POST['amount'],
  'paymentMethodNonce' => 'nonce-from-the-client'
));



/*

CALL BACK

/*
?>