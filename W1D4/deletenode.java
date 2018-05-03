/*
  Delete Node at a given position in a linked list 
  head pointer input could be NULL as well for empty list
  Node is defined as 
  class Node {
     int data;
     Node next;
  }
*/
    // This is a "method-only" submission. 
    // You only need to complete this method. 

Node Delete(Node head, int position) {
  // Complete this method
    if (head == null) {
        return null;
    }
    
    if (position == 0) {
        return head.next;
    }
    
    Node trail = head;
    Node lead = head.next;
    
    for (int i = 0; i < position - 1; i++) {
        trail = trail.next;
        lead = lead.next;
    }
    
    trail.next = lead.next;
    
    return head;
}