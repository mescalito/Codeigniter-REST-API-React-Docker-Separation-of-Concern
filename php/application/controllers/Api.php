<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database();
		$this->load->model('api_model');
		$this->load->library('form_validation');
	}

	function index(){
		$data = $this->api_model->fetch_all();
		echo json_encode($data->result_array());
	}

}


?>