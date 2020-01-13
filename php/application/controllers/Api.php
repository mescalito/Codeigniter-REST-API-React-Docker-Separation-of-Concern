<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->database();
		$this->load->model('api_model');
		$this->load->library('form_validation');
	}

	function getUsers(){
		$data = $this->api_model->fetch_all();
		echo json_encode($data->result_array());
	}

	function saveUser(){
		$this->form_validation->set_rules("name", "name", "trim|required|min_length[2]|max_length[100]");
		$this->form_validation->set_rules("DOB", "DOB", "trim|required|min_length[8]|max_length[45]");
		$this->form_validation->set_rules("email", "email", "trim|required|valid_email|min_length[5]|max_length[45]|is_unique[Users.email]", array('is_unique' => 'The %s is already taken'));
		$this->form_validation->set_rules("color", "color", "trim|max_length[45]");
		$return = array();
		if($this->form_validation->run()){
			/* $data = array(
				'first_name' => trim($this->input->post('name')),
				'last_name'  => trim($this->input->post('last_name'))
			);*/
			$data = array(
				'name' => trim($this->input->post('name')),
				'DOB' => trim($this->input->post('DOB')),
				'email' => trim($this->input->post('email')),
				'color' => trim($this->input->post('color')),
			);
			if(!$this->api_model->insert_api($data)){
				$return = array(
					'error'    => true,
					'DB error' => true
				);
			}
			$return = array(
				'success'  => true
			);
		} else {
			$return = array(
				'error'    => true,
				'name' => form_error('name'),
				'DOB' => form_error('DOB'),
				'email' => form_error('email'),
				'color' => form_error('color')
			);
		}
		echo json_encode($return, true);
	}

}


?>