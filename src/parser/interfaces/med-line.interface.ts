export interface MedLine {
  cis_code: number | null;
  name: string | null;
  type: string | null;
  to_use: string[] | null;
  status: string | null;
  process_type: string | null;
  shoppable: boolean | null;
  date_of_shop: Date | null;
  availabity_status: string | null;
  auth_number: string | null;
  owners: string[] | null;
  enforce_warning: boolean | null;
}
