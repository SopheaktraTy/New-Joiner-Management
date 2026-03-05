import type { NewJoiner } from "../types/newJoiner";

/**
 * Path B: NO '?' parameters because the ODBC driver doesn't support it.
 * All escaping happens here so controllers stay clean.
 */

const escText = (v: unknown) => {
  if (v === null || v === undefined || String(v).trim() === "") return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`; // Access escape '
};

const escDate = (v: unknown) => {
  if (!v) return "NULL";
  const d = new Date(v as any);
  if (Number.isNaN(d.getTime())) return "NULL";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `#${y}-${m}-${day}#`; // Access date literal
};

export const NEW_JOINER_SQL = {
  getAll: () => `
    SELECT * FROM NewJoiners
    ORDER BY joinDate DESC, lastName ASC
  `,

  getLatest: () => `
    SELECT TOP 1 * FROM NewJoiners
    ORDER BY createdAt DESC, id DESC
  `,

  deleteById: (id: number) => `
    DELETE FROM NewJoiners
    WHERE id = ${id}
  `,

  insert: (data: Partial<NewJoiner>) => `
    INSERT INTO NewJoiners (
      firstName, lastName, jobTitle, companyEmail, staffInitial, phoneExtension,
      joinDate, localDomainUser, department, tidApprovalStatus, defaultPrinter,
      accessResource, localDomainUserGroup, emailUserGroup, createdAt
    ) VALUES (
      ${escText(data.firstName)},
      ${escText(data.lastName)},
      ${escText(data.jobTitle)},
      ${escText(data.companyEmail)},
      ${escText(data.staffInitial)},
      ${escText(data.phoneExtension)},
      ${escDate(data.joinDate)},
      ${escText(data.localDomainUser)},
      ${escText(data.department)},
      ${escText(data.tidApprovalStatus)},
      ${escText(data.defaultPrinter)},
      ${escText(data.accessResource)},
      ${escText(data.localDomainUserGroup)},
      ${escText(data.emailUserGroup)},
      Now()
    )
  `,
};