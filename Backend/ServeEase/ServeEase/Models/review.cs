//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServeEaseV3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class review
    {
        public int review_id { get; set; }
        public int cust_id { get; set; }
        public int sp_id { get; set; }
        public int apt_id { get; set; }
        public string review1 { get; set; }
        public string complaint { get; set; }
        public Nullable<int> ratings { get; set; }
    
        public virtual appointment appointment { get; set; }
        public virtual customer customer { get; set; }
        public virtual service_providers service_providers { get; set; }
    }
}
