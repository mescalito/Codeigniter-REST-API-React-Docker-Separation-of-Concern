<?php
class Api_model extends CI_Model
{
	function fetch_all(){
		$this->db->order_by('id', 'DESC');
		return $this->db->get('cielo_sample');
	}
}

?>