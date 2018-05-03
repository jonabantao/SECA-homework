/*
  Insert Node at the end of a linked list 
  head pointer input could be NULL as well for empty list
  Node is defined as 
  class Node {
     int data;
     Node next;
  }
*/
Node Insert(Node head,int data) {
// This is a "method-only" submission. 
// You only need to complete this method. 
    Node newNode = new Node();
    newNode.data = data;
    
    if (head == null) {
        return newNode;
    }
    
    Node ptr = head;
    
    while (ptr.next != null) {
        ptr = ptr.next;
    }
    
    ptr.next = newNode;
    return head;
}