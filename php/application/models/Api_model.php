<?php
class Api_model extends CI_Model
{
	function fetch_all(){
		$this->db->order_by('id', 'DESC');
		return $this->db->get('Users');
	}

	function insert_api($data){
		$this->db->insert('Users', $data);
		if($this->db->affected_rows() > 0){
			return true;
		} else {
			return false;
		}
	}
}

?>