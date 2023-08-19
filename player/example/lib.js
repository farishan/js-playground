/**
 * Dependencies:
 * - ID generator
 * - Element selector
 */

function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function el(id){
  return document.getElementById(id);
}