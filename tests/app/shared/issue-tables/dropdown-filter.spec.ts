import { OrderOptions, SortOptions, StatusOptions, TypeOptions } from '../../../../src/app/core/constants/filter-options.constants';
import { Issue } from '../../../../src/app/core/models/issue.model';
import { Filter } from '../../../../src/app/core/services/filters.service';
import { applyDropdownFilter } from '../../../../src/app/shared/issue-tables/dropdownfilter';
import {
  CLOSED_ISSUE_WITH_EMPTY_DESCRIPTION,
  CLOSED_PULLREQUEST_WITH_EMPTY_DESCRIPTION,
  ISSUE_WITH_EMPTY_DESCRIPTION,
  MERGED_PULLREQUEST_WITH_EMPTY_DESCRIPTION,
  PULLREQUEST_WITH_EMPTY_DESCRIPTION
} from '../../../constants/githubissue.constants';

describe('search-filter', () => {
  describe('applyDropdownFilter()', () => {
    const defaultFilter: Filter = {
      title: '',
      status: [StatusOptions.OpenPullRequests, StatusOptions.MergedPullRequests, StatusOptions.OpenIssues, StatusOptions.ClosedIssues],
      type: TypeOptions.All,
      sort: { active: SortOptions.Status, direction: OrderOptions.Asc },
      labels: [],
      milestones: [],
      hiddenLabels: new Set<string>(),
      deselectedLabels: new Set<string>(),
      itemsPerPage: 50,
      assignees: []
    };

    const openIssue: Issue = Issue.createPhaseBugReportingIssue(ISSUE_WITH_EMPTY_DESCRIPTION);
    const closedIssue: Issue = Issue.createPhaseBugReportingIssue(CLOSED_ISSUE_WITH_EMPTY_DESCRIPTION);
    const OpenPullReqeust: Issue = Issue.createPhaseBugReportingIssue(PULLREQUEST_WITH_EMPTY_DESCRIPTION);
    const ClosedPullReqeust: Issue = Issue.createPhaseBugReportingIssue(CLOSED_PULLREQUEST_WITH_EMPTY_DESCRIPTION);
    const MergedPullRequest: Issue = Issue.createPhaseBugReportingIssue(MERGED_PULLREQUEST_WITH_EMPTY_DESCRIPTION);

    const issuesList: Issue[] = [openIssue, closedIssue, OpenPullReqeust, ClosedPullReqeust, MergedPullRequest];

    it('filter open issues success', () => {
      let openIssueFilter = defaultFilter;
      openIssueFilter.status = [StatusOptions.OpenIssues];
      expect(applyDropdownFilter(openIssueFilter, issuesList, false, false)).toEqual([openIssue]);
    });

    it('filter closed issues success', () => {
      const closedIssuesFilter = defaultFilter;
      closedIssuesFilter.status = [StatusOptions.ClosedIssues];
      expect(applyDropdownFilter(closedIssuesFilter, issuesList, false, false)).toEqual([closedIssue]);
    });

    it('filter open pull requests success', () => {
      const openPullRequestFilter = defaultFilter;
      openPullRequestFilter.status = [StatusOptions.OpenPullRequests];
      expect(applyDropdownFilter(openPullRequestFilter, issuesList, false, false)).toEqual([OpenPullReqeust]);
    });

    it('filter closed pull requests success', () => {
      const closedPullRequestFilter = defaultFilter;
      closedPullRequestFilter.status = [StatusOptions.ClosedPullRequests];
      expect(applyDropdownFilter(closedPullRequestFilter, issuesList, false, false)).toEqual([ClosedPullReqeust]);
    });

    it('filter merged pull requests success', () => {
      const mergedPullRequestFilter = defaultFilter;
      mergedPullRequestFilter.status = [StatusOptions.MergedPullRequests];
      expect(applyDropdownFilter(mergedPullRequestFilter, issuesList, false, false)).toEqual([MergedPullRequest]);
    });
  });
});
